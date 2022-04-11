<template>
    <div>
        <Header></Header>
        <div class="wrap">
            <div class="book_bar relative">
                <div class="flex">
                    <div class="bookcover">
                        <img :src="BASEURL + bookInfo.cover" />
                    </div>
                    <div class="flex flex-column ml15" style="text-align:left;">
                        <div class="bookName">{{ bookInfo.name }}</div>
                        <div
                            class="bookAuthor"
                        >{{ simplifyCountry(bookInfo.author.country) + bookInfo.author.name }}</div>
                        <div
                            class="pubinfo"
                        >{{ (bookInfo.producer ? (bookInfo.producer + '·') : '') + bookInfo.publisher }}</div>
                    </div>
                </div>
                
            </div>
            <div>
                <div>
                    <div class="title flex flex-vcenter">
                        页码(可不填)：
                        <a-input-number id="inputNumber" v-model:value="page" :min="0" :max="1000" />
                        
                            <button class="publish" @click="checkAndShowDlg">发表</button>
                      
                    </div>
                    <div class="cutline"></div>
                </div>
                <div class="editor">
                    <div class="toolbar" ref="toolbar"></div>
                    <div class="edittext" ref="edittext"></div>
                </div>
            </div>
        </div>
        <a-spin :spinning="spinning" />
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, h } from 'vue'
import Header from '@C/Header.vue'
import { BASEURL } from '@/config'
import { useRoute, useRouter } from 'vue-router'
import E from 'wangeditor'
import { simplifyCountry } from '@/utils/utils'
import editorApi from '@/api/editor';
import { message, Modal } from 'ant-design-vue'
import { LoadingOutlined } from '@ant-design/icons-vue'
import { useStore } from 'vuex'
import router from '@/router'
import userApi from '@/api/user'
const spinning = ref<Boolean>(false)

let bookInfo = ref({ _id: '', name: '', cover: '', author: { name: '', country: '' }, producer: '', publisher: '' })
const route = useRoute()
const store = useStore()
let editor = ref(null);
let edittext = ref(null);
let toolbar = ref(null)
bookInfo.value = JSON.parse(route.params.book as string)
console.log(bookInfo.value)

onMounted(() => {
    setEditor()
})
let page = ref<Number>(0)
const checkAndShowDlg = () => {
    let content = formatContent(editor.txt.html())
    console.log(content)     
    Modal.confirm({
        title: '确认发表书摘吗？',
        onOk() {
            const params = {
                page:page.value,
                content: formatContent(editor.txt.html()),
                text: editor.txt.text(),
                writer: JSON.parse(store.state.user.userInfo)._id,
                related_book: bookInfo.value._id,
            }
            editorApi.publishExcerpt(params).then((res) => {
                console.log(res._id)
                message.success('发布成功!')
                setTimeout(() => {
                    router.push({ name: 'ExcerptContent', params: { id: res._id } })

                }, 3000)
            })
        }
    })
}


function formatContent(text: string) {
    text = text.replace(/&nbsp;/g, '')
    text = text.replace(/&amp;/g, '&')
    return text
}

function setEditor() {
    editor = new E(toolbar.value, edittext.value)
    editor.config.placeholder = '写书摘...'
    editor.config.focus = false
    editor.config.pasteFilterStyle = false
    editor.config.menus = ['head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'indent', // 缩进
        'link', // 插入链接
        'justify', // 对齐方式
        'quote', // 引用
        'splitLine',
        'undo', // 撤销
        'redo' // 重复
    ]
    editor.create()

}
</script>
<style lang="less" scoped>
.wrap {
    width: 750px;
    margin: 0 auto;
    margin-top: 30px;
}
.book_bar {
    height: 150px;
    background: #f2f2f2;
    .bookcover {
        width: 86px;
        height: 120px;
        cursor: pointer;
        border-radius: 10px;
        margin-left: 20px;
        margin-top: 15px;
        img {
            background-size: 100% 100%;
            width: 86px;
            height: 120px;
            border-radius: 10px;
        }
    }
    .bookName {
        color: @soft_blue;
        font-size: 1.125rem;
        margin-top: 15px;
    }
    .bookAuthor {
        margin-top: 25px;
        font-size: 0.875rem;
    }
    .pubinfo {
        margin-top: 20px;
        font-size: 0.875rem;
    }
    .reselectBtn {
        position: absolute;
        right: 20px;
        top: 15px;
        height: 30px;
        width: 83px;
        border: none;
        border-radius: 5px;
        font-size: 14px;
        cursor: pointer;
        background: #555;
        color: #fff;
    }
    .pubinfo {
        font-size: 0.875rem;
    }
}


    .publish {
        margin-left: auto;
        height: 30px;
        width: 83px;
        cursor: pointer;
        background: @soft_blue;
        color: #fff;
        border: none;
        border-radius: 5px;
        font-size: 0.875rem;
    }

.title {
    margin: 20px auto 20px 0;
    width: 750px;
    text-align: left;

    .title_input {
        height: 32px;
        line-height: 32px;
        border: none;
        font-size: 1.125rem;
        width: 500px;
        outline: none;
    }
}

.cutline {
    width: 750px;
    height: 1px;
    background: #ccc;
    margin-top: 20px;
}
.editor {
    width: 750px;
    margin: 0 auto;
    position: relative;
    z-index: 0;
    margin-bottom: 40px;
}
.edittext {
    /* border: 1px solid #ccc; */
    min-height: 500px;
    text-align: left;
}
</style>