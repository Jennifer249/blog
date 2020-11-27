<template>
  <div class="editor">
    <div class="editor-line d-flex">
      <div @click="$router.go(-1)" class="back">&#xab;</div>
      <input type="text" placeholder="输入文章标题" class="d-flex" v-model="article.title">
      <div class="editor-button d-flex">
        <button @click="showPublishModal">发布文章</button>
        <button @click="handleSaveDraft"  v-if="isNoPublished">保存草稿</button>
      </div>
    </div>
    <div id="editor-area" class=" d-flex">
      <div contenteditable="true" id="md" @keyup="mdConverter($event)" @paste="handlePaste" @scroll="scrollAuto" ref="md"></div>
      <article id="view-area" class="markdown-body" v-html="conMessage" v-highlight ref="view"></article>
    </div>
    <Modal ref="modal" :styleObj="styleObj" @closeModal="handleCloseModal">
      <div class="modal-inner">
        <h3>发布文章</h3>
        <div class="d-flex">
          <label>文章标签:</label>
          <MarkSelection :tags="article.tags" :info="markItem[0]" @addTag="handleAddTag" @delTag="handleDeleteTag" ref="tag"></MarkSelection>
        </div>
        <div class="d-flex">
          <label>文章专栏:</label>
          <MarkSelection :tags="currCategoriesName" :info="markItem[1]" @addTag="handleAddTag" @delTag="handleDeleteTag" ref="categories"></MarkSelection>
          <Droplist
          :init-info="dropItem"
          @selectData="getSelectData" v-if="categories.length"></Droplist>
        </div>
        <div class="d-flex">
          <label>文章类型:</label>
          <ul>
            <li v-for="(item, index) in stateItem" :key="item">
              <input type="radio" :id="'state' + index" v-model="article.state" :value="index+1"/>
              <label :for="'state' + index">{{ item }}</label>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer-btn">
        <button @click="handleSaveDraft" v-if="isNoPublished">保存草稿</button>
        <button @click="handlePublish">发布文章</button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import { uploadFile, saveArticle, getCategories, getArticle, addCategories, getBaseUrl } from '@/api/api';
  import Modal from '@/components/back/modal';
  import MarkSelection from '@/components/back/mark_selection';
  import Droplist from '@/components/back/droplist';

  var showdown = require('showdown');
  var converter = new showdown.Converter();
  // 增加拓展table
  converter.setOption('tables', true);
  converter.setOption('simpleLineBreaks', true);
  converter.setOption('parseImgDimensions', true);

  export default {
    components: { Modal, MarkSelection, Droplist },
    data() {
      return {
        conMessage: '',
        // 传给服务器的数据
        article: {
          id: parseInt(this.$route.query.id),
          content: '',
          title: '',
          categoriesId: 0,
          tags: [],
          state: 1,
          date: ''
        },
        imageId: [],
        styleObj: {
          position: 'fixed',
          bottom: 0,
          top: 0,
          left: 0,
          background: 'rgba(113, 111, 111, 0.5)',
          width: '100%'
        },
        markItem: [
          {
            name: 'tag',
            limit: 3,
            description: '增加标签'
          },
          {
            name: 'categories',
            limit: 1,
            description: '增加专栏'
          }
        ],
        dropItem: {
          name: '专栏',
          width: '',
          data: []
        },
        // 判断是否文章已发布，是的话，隐藏保存草稿相关按钮
        isNoPublished: true,
        stateItem: ['公开', '私密'],
        // 从服务器返回的专栏列表，包含id和name
        categories: [],
        // 传给组件的专栏名称
        currCategoriesName: [],
        show: false
      };
    },
    watch: {
      // 同步更新返回给服务器的专栏Id
      currCategoriesName() {
        let r = this.categories.some((item) => {
          if (item['categories_name'] === this.currCategoriesName[0]) {
            this.article.categoriesId = item['categories_id'];
            return true;
          }
        });
        if (!r) {
          this.article.categoriesId = 0;
        }
      },
      show() {
        if (this.show) {
          let _this = this;
          setTimeout(function() {
            _this.show = false;
          }, 3000 );
        }
      }
    },
    mounted() {
      // 判断入口为写文章还是编辑
      if (!this.article.id) {
        return;
      }
      this.getEditArticle();
    },
    methods: {
      // 判断文章是否已发布
      isPublished() {
        if (this.article.state !== 3) {
          this.isNoPublished = false;
        } else {
          this.isNoPublished = true;
        }
      },
      // 获得已编辑的文章
      getEditArticle() {
        getArticle({'params': {id: this.article.id}}).then(res => {
          if (res.state && res.data.length) {
            let articleInfo = res.data[0];
            this.article.title = articleInfo['article_title'];
            this.article.content = articleInfo['article_content'];
            this.article.categoriesId = articleInfo['categories_id'];
            this.article.tags = articleInfo['tags'] ? articleInfo['tags'].split(',') : [];
            this.article.state = articleInfo['article_state'];

            let d = new Date(articleInfo['article_time']);
            this.article.date = d.toLocaleDateString().replace(/\//g, '-') + ' ' + d.toTimeString().slice(0,8);

            this.$refs.md.innerHTML = this.article.content;
            this.conMessage = converter.makeHtml(this.$refs.md.innerText.replace(/\n\n/g, '\n')).replace(/&nbsp;|&amp;nbsp;/g, ' ');
            // 标识文章状态，是否已发表
            this.isPublished();
          } else {
            this.$myMessage('获取文章数据失败');
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 显示模拟框
      showPublishModal() {
      　　this.$refs.modal.showModal = true;
        // 设置模拟框中的目录下拉框
        this.setCategories();
      },
      // 编辑器转换
      mdConverter(event) {
        // 修改空格显示格式，使之正确
        this.article.content = this.$refs.md.innerHTML.replace(/&nbsp;/, ' ');
        this.conMessage = converter.makeHtml(event.target.innerText.replace(/\n\n/g, '\n')).replace(/&nbsp;|&amp;nbsp;/g, ' ');
      },
      //  编辑区和预览区,滚动条同时移动
      scrollAuto() {
        this.md = this.$refs.md;
        this.view = this.$refs.view;
        var percentage = this.md.scrollTop / (this.md.scrollHeight - this.md.offsetHeight);
        var height = percentage * (this.view.scrollHeight - this.view.offsetHeight);
        this.view.scrollTop = height;
      },
      fireKey(element, key) {
        console.log(element, key);
        if (!element) {
          return;
        }
        const keydown = document.createEvent('Events');
        keydown.initEvent('keydown', true, true);
        keydown.keyCode = keydown.which = key;
        element.dispatchEvent(keydown);

        const keyup = document.createEvent('Events');
        keyup.initEvent('keyup', true, true);
        keyup.keyCode = keyup.which = key;
        element.dispatchEvent(keyup);
      },
      //  监听粘贴操作
      handlePaste(event) {
        const items = (event.clipboardData || window.clipboardData).items;
        let file = null;

        if (!items || items.length === 0) {
          this.$myMessage('当前浏览器不支持本地');
          return;
        }
        //  搜索剪切板items
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf('image') !== -1) {
            file = items[i].getAsFile();
            break;
          }
        }
        if (!file) {
          return;
        }
        // 阻止原生粘贴事件
        event.preventDefault();
        //  此时file就是我们的剪切板中的图片对象
        const reader = new FileReader();
        reader.readAsDataURL(file);
        this.uploadImg(file);
        
      },
      // 上传文件成功后回调
      uploadImg(file) {
        let params = new FormData();
        params.append('file', file);
        let config = {
          headers: { 'Content-Type': 'multipart/form-data'}
        };
        uploadFile(params, config).then(res => {
          // 1.上传给服务器后，通过获得的路径在编辑区回显<img src="路径">。
          // 2.生成文本，供md编辑器解析，在显示区显示图片
          let spanWrap = document.createElement('span');
          spanWrap.className = 'img-wrapper';
          let selection = window.getSelection();
          let range = selection.getRangeAt(0);
          let imgShow = document.createElement('img');

          let imgSrc = getBaseUrl() + '/' + res.data.imgSrc.replace(/\\/g, '/');
          console.log('imgSrc', imgSrc);
          imgShow.setAttribute('src', imgSrc);
          let imgSpan = document.createElement('span');
          imgSpan.innerHTML = `![在这里插入图片描述](${imgSrc})`;

          spanWrap.appendChild(imgShow);
          spanWrap.appendChild(imgSpan);
          range.insertNode(spanWrap);

          this.imageId.push(res.data.imgId);
        }).catch(err => {
          console.log(err);
        });
      },
      // 保存草稿
      async handleSaveDraft() {
        if (this.article.title === '') {
          this.$myMessage('文章标题不能为空');
          return;
        }
        let d = new Date();
        let fd = d.toLocaleDateString().replace(/\//g, '-') + ' ' + d.toTimeString().slice(0,8);

        this.article.date = fd;
        this.article.state = 3;
        await this.addCategoriesM();

        let value = {
          article: this.article,
          imageId: this.imageId
        };

        saveArticle(value).then(res => {
          this.article.id = res.data.id;
          // 模拟框数据重置
          this.$refs.modal.cancelClick();
          this.$myMessage('保存成功');
        }).catch(err => {
          console.log(err);
        });
      },
      async addCategoriesM() {
        // 未存在该专栏，则新增专栏
        if (this.currCategoriesName.length && !this.article.categoriesId) {
          await addCategories({name: this.currCategoriesName[0]}).then(res => {
            this.article.categoriesId = res.data;
          });
        }
      },
      // 发布文章
      async handlePublish() {
        if (this.article.state === 3) {
          this.$myMessage('文章类型不能为空');
          return;
        }
        if (this.article.title === '') {
          this.$myMessage('文章标题不能为空');
          return;
        }

        if (this.isNoPublished) {
          let d = new Date();
          this.article.date = d.toLocaleDateString().replace(/\//g,'-') + ' ' + d.toTimeString().slice(0,8);
        }
        try {
          await this.addCategoriesM();
        } catch(err) {
          console.log(err);
          return;
        }

        let value = {
          article: this.article,
          imageId: this.imageId
        };

        saveArticle(value).then(() => {
          this.$myMessage({
            text: '发布成功',
            duration: 1500
          });
          window.setTimeout(() => {
            this.$router.push({name: 'article_mgt'});
          }, 1500);
        }).catch(err => {
          console.log(err);
        });
      },
      // 关闭模拟框
      handleCloseModal() {
        this.$refs.tag.tagHidden = true;
        this.$refs.categories.tagHidden = true;
      },
      // 增加标签
      handleAddTag(name, newItem) {
        if(name === 'tag'){
          this.article.tags.push(newItem);
        } else {
          this.$set(this.currCategoriesName, 0, newItem);
        }
      },
      // 删除标签
      handleDeleteTag(name, index) {
        if (name === 'tag'){
          this.article.tags.splice(index, 1);
        } else {
          this.currCategoriesName.pop();
        }
      },
      // 返回专栏列表
      setCategories() {
        getCategories().then(res => {
          this.categories = res.data;
          let categoriesList = [];
          for (let i = 0; i < this.categories.length; i++) {
            categoriesList[i] = this.categories[i]['categories_name'];
          }
          this.dropItem.data = categoriesList;
          this.dropItem.width = 150;

          // 从文章编辑入口进入:通过专栏id获取专栏名称
          if (this.article.categoriesId) {
            this.categories.forEach((item) => {
              if(item['categories_id'] === this.article.categoriesId) {
                this.$set(this.currCategoriesName, 0, item['categories_name']);
              }
            });
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 获得专栏选项结果
      getSelectData(name, value) {
        this.$refs.categories.tagHidden = true;
        this.$set(this.currCategoriesName, 0, value);
      }
    }
  };
</script>

<style scoped>
    @import '../../assets/css/markdown.css';
    /*写文章*/
    .editor .editor-line {
        width: 100%;
        padding: 10px 15px;
        align-items: center;
        flex-wrap: nowrap;
        background-color: #f5f5f5;
        border-bottom: 1px solid #ddd;
    }
    .editor-line .back {
        padding-left: 10px;
        color: #999;
        font-size: 22px;
        white-space: nowrap;
        cursor: pointer;
    }
    .editor-line input {
        height: 40px;
        width: 100%;
        margin: 0 20px;
        padding-left: 10px;
        font-size: 16px;
        border-radius: 4px;
        outline: none;
    }
    .editor-line .editor-button {
        float: right;
    }
    .editor-button button {
        margin-right: 10px;
        background: #fff;
        color: #33b7ff;
        border: 1px solid #33b7ff;
        height: 40px;
        font-size: 16px;
        white-space: nowrap;
    }
    .editor-button button:hover {
        background: rgba(33,183,255,.1);
    }
    #editor-area {
        height: 800px;
        width: 99%; text-indent: 4;
    }
    #md {
        color: rgba(0, 0, 0, .8);
        width: 100%;
        height: 100%;
        line-height: 1.625;
        outline: none;
        background: #f5f5f5;
        font-size: 16px;
        padding: 10px 16px 176px;
        overflow: auto;
        font-family: -apple-system,SF UI Text,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
    }
    article {
        margin: 0;
        box-shadow: none;
    }
    #view-area {
        width: 100%;
        background: #fff;
        padding: 10px 16px 176px;
        overflow: auto;
    }
    .modal-inner > h3 {
        margin-bottom: 16px;
        font-size: 16px;
        color: #3c3c3c;
        line-height: 24px;
    }
    .modal-inner label {
        margin-right: 16px;
        display: block;
        font-size: .9rem;
        color: #4d4d4d;
        white-space: nowrap;
        line-height: 32px;
    }
    .modal-inner > div {
        margin: 1.5em 0;
    }
    ul li {
        display: inline-block;
        margin-right: 20px;
    }
    .footer-btn {
        float: right;
    }
    .footer-btn button {
        color: #fff;
        background-color: rgba(33,183,255,.6);
        margin-left: 20px;
    }
    .footer-btn button:hover {
        background-color: rgba(33,183,255);
    }
</style>
