<template>
    <div class="blackList">
        <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleChange"
            :file-list="fileList">
            <span>上传附件<img src="../../../assets/upload.png" alt="" >(请点击左侧图标上传附件)</span>
        </el-upload>    
    </div>
</template>
<script>
export default {
    name: 'BlackList',
    data() {
        return {
            fileList: [
                {
                    name: 'food.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }, 
                {
                    name: 'food2.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }
            ]
        }
    },
    methods: {
        handleChange(file, fileList) {
            this.fileList = fileList.slice(-3);
        }
    }
}
</script>

<style lang="scss" scoped>
.blackList {
    padding: 20px;
    .upload-demo {
        width: 300px;
    }
    span {
        display: flex;
        align-items: center;
        img {
            margin: 0 8px;
            cursor: pointer;
        }
    }
}
</style>