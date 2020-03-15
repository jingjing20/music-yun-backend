<template>
  <div>
    <el-table v-loading="loading" :data="blogList" stripe>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="nickName" label="发布人"></el-table-column>
      <el-table-column prop="createTime" label="发布时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="onDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 确认删除的对话框 -->
    <el-dialog title="提示" :visible.sync="delDialogVisible" width="30%">
      <span>确定删除该博客吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doDel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {fetchList, del} from '@/api/blog';
import scroll from '@/utils/scroll';
// 引入moment时间处理js类库
import moment from 'moment';
export default {
  data () {
    return {
      blogList: [],
      count: 15,
      loading: false,
      delDialogVisible: false,
      blog: {},
      moment
    }
  },
  created() {
    this.getList()
  },
  mounted(){
      scroll.start(this.getList)
  },
  methods: {
    getList(){
      this.loading = true
      fetchList({
        start: this.blogList.length,
        count: this.count
      }).then((res) => {
        console.log(res)
        const data = res.data
        let _blogList = [], jing = []
        for(let i = 0, len = data.length; i< len;i++) {
          _blogList.push(JSON.parse(data[i]))
          console.log(_blogList[i].createTime)
        }
        console.log(_blogList)
        for(let i = 0, len = _blogList.length; i< len;i++) {
          jing[i] = JSON.parse(JSON.stringify(_blogList[i].createTime.$date))
          _blogList[i].createTime = moment(jing[i]).format('YYYY-MM-DD HH:mm:ss')
        }
        this.blogList = this.blogList.concat(_blogList)
        if(_blogList.length < this.count){
            scroll.end()
        }
        this.loading = false
        
      })
    },
    onDel(row){
        this.blog = row
        this.delDialogVisible = true
    },
    doDel(){
        this.delDialogVisible = false
        this.loading = true
        del(this.blog).then((res)=>{
            this.loading = false
            console.log(res)
            if(res.data.delBlogRes.deleted > 0){
                this.blogList = []
                this.getList()
                this.$message({
                    message: '删除成功',
                    type: 'success'
                })
            }
        })
    },
  }
}
</script>

<style lang='stylus' scoped>

</style>
