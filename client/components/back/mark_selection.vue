<template>
	<div class="mark-select">
		<span class="add-tag tags" v-for="(item, index) in tags">
			{{item}}
			<a class="icon-delete" @click="handleDeleteTag(index)">&#x2718;</a>
		</span>
		<div :class="['add-tag', 'tags', {isHidden:tagHidden}]">
			<input size="2" type="text" v-on:keyup.13="handleAddTag" v-model="newTag" ref="inputs">
			<a class="icon-delete" @click="tagHidden=true;">&#x2718;</a>
		</div>			
		<button @click="handleAddTag" class="add-btn tags">
			<svg width="200px" height="200.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" class="icon"><path fill="#555666" d="M464.32 464.341333V178.368a47.658667 47.658667 0 1 1 95.338667 0v285.973333h285.952a47.658667 47.658667 0 0 1 0 95.317334H559.658667v285.952a47.68 47.68 0 0 1-95.338667 0V559.658667H178.368a47.658667 47.658667 0 1 1 0-95.317334h285.952z"></path></svg>
			{{info.description}}
		</button>
	</div>
</template>
<script>
	export default {
		props: {
			tags: Array,
			info: Object
		},
		data() {
			return {
				tagHidden: true,
				newTag: ''
			}
		},
		watch: {
			tagHidden() {
				if (this.tagHidden) {
					this.newTag = '';
				}
			}
		},
		methods: {
			handleAddTag() {
				if (this.tags.length === this.info.limit) {
					alert(`最多不超过${this.info.limit}个`);
					return;
				}
				this.tagHidden = this.tagHidden ? false : true;
				this.$nextTick(()=>{   
			       this.$refs.inputs.focus();
			    })
				if (this.newTag.trim() === '') {
					return;
				}
				this.$emit("addTag", this.info.name, this.newTag.trim());
			},
			handleDeleteTag(index) {
				this.$emit("delTag", this.info.name, index);
			}
		}
	}
</script>
<style>
	.mark-select {
		display: flex;
	}
	.mark-select .icon {
		width: 14px;
	    height: 18px;
	    font-size: 20px;
	    vertical-align: -4px;
	}
	.isHidden {
		display: none;
	}
	.tags {
		padding: 0px 8px;
		font-size: 14px;
		line-height: 28px;
	}
	.add-tag {
		color: #267dcc;
    	background: rgba(38,125,204,.05);
    	border-radius: 4px;
    	border: 1px solid rgba(38, 125, 204, .2);
    	margin-right: 8px;
	}
	.add-tag input {
		outline: none;
		border: none;
		background-color: transparent;
	}
	.icon-delete {
		color: #bbb;
    	cursor: pointer;
	}
	.icon-delete:hover {
		color: #3485cf;
	}
	.add-btn {
		background-color: #fff;
		outline: none; 
		margin-left: 0px;
		border: 1px solid #ddd;
		color: #555666;
	}
</style>