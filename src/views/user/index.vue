<template>
  <div class="app-container">
    <!-- 照片对话框 -->
    <el-dialog
      :visible.sync="ImageDialog"
      width="40%"
      close-on-press-escape
      class="ImgDialog"
    >
      <img :src="currentImage" alt="" class="currentImage" />

      <span slot="footer" class="dialog-footer">
        <span
          class="tag-read copyImg"
          :data-clipboard-text="currentImage"
          @click="copyImg"
          >复制图片地址</span
        >
      </span>
    </el-dialog>
    <span>用户列表</span
    ><span class="prompt">(已注册用户: {{ userNum }}人)</span>
    <el-card class="cardBox">
      <div class="topSearch">
        <el-form
          :inline="true"
          :model="userData"
          class="demo-form-inline"
          ref="userData"
        >
          <el-form-item label="用户名" prop="userName">
            <el-input
              placeholder="用户名"
              class="SearchInput"
              v-model="userData.userName"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户UUID" prop="userUUid">
            <el-input
              placeholder="用户UUID"
              class="SearchInput"
              v-model="userData.userUUid"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户类型" prop="value">
            <el-select
              v-model="userData.value"
              placeholder="请选择"
              class="searchSelect"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" style="margin-left:10px" @click="searchUser"
              >查询</el-button
            >
            <el-button
              size="small"
              type="primary"
              @click="resetForm('userData')"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <!-- 表格 -->
      <el-table
        :data="userInfo"
        border
        style="width: 100%"
        :header-cell-style="{
          'background-color': '#D8E0EA',
          color: '#909399',
          'font-weight': '400'
        }"
        >>
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column label="照片" width="80" align="center">
          <template slot-scope="scope">
            <img
              :src="scope.row.imageUrl"
              alt=""
              style="width:40px;height:33px"
            />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="280" align="center">
        </el-table-column>
        <el-table-column prop="role" label="类型" align="center" width="280">
        </el-table-column>
        <el-table-column
          prop="personUuid"
          label="UUID"
          align="center"
          width="285"
        >
        </el-table-column>
        <el-table-column label="性别" align="center" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.gender === 1 ? "男" : "女" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄" align="center" width="80">
        </el-table-column>
        <el-table-column prop="phone" label="手机" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" width="185">
          <template slot-scope="scope">
            <el-button size="mini" @click="getImage(scope.$index, scope.row)"
              >照片({{ scope.row.imageUrl !== ''? 1 : 0 }})</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import Clipboard from "clipboard";
import { getList } from "@/api/table";
export default {
  data() {
    return {
      userNum: 0,
      userData: {
        userName: "",
        userUUid: "",
        value: ""
      },
      options: [
        {
          value: "",
          label: "不限"
        },
        {
          value: "员工",
          label: "员工"
        },
        {
          value: "访客",
          label: "访客"
        },
        {
          value: "参会者",
          label: "参会者"
        },
        {
          value: "会员",
          label: "会员"
        },
        {
          value: "黑名单",
          label: "黑名单"
        }
      ],
      userInfo: [],
      total: 0,
      currentPage: 1,
      ImageDialog: false,
      currentImage: ""
    };
  },
  methods: {
    async getUserInfo() {
      const data = await getList({
        pageSize: 10,
        pageNo: this.currentPage
      });
      this.userInfo = data.data.personList;
      this.total = data.data.total;
      this.userNum = data.data.total
    },
    getImage(index, row) {
      this.currentImage = row.imageUrl;
      this.ImageDialog = true;
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getUserInfo()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    copyImg() {
      var clipboard = new Clipboard(".tag-read");
      clipboard.on("success", e => {
        this.$notify({
          title: "",
          message: `<b style="  position: relative;top: -3px"> 复制成功 </b>`,
          type: "success",
          dangerouslyUseHTMLString: true,
          duration: 2000
        });
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        this.$notify.error({
          title: "",
          message: `<b style="  position: relative;top: -3px"> 复制失败 </b>`,
          dangerouslyUseHTMLString: true,
          duration: 2000
        });
        // 释放内存
        clipboard.destroy();
      });
    },
   async searchUser() {
       const data = await getList({
        pageSize: 10,
        pageNo: 1,
        name:this.userData.userName,
        personUuid:this.userData.userUUid,
        role:this.userData.value
      });
      if(data.data == '') {
        this.userInfo = []
        this.total = 0
      }else {
        this.userInfo = data.data.personList
        this.total = data.data.total;
      }
      this.currentPage = 1
    }
  },
  created() {
    this.getUserInfo();
  }
};
</script>

<style lang="scss" scoped>
div {
  box-sizing: border-box;
}
.prompt {
  color: #999;
  font-size: 14px;
  margin-left: 5px;
}
.cardBox {
  margin-top: 10px;
}
.topSearch {
  display: flex;
}
.Search {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 260px;
}
/deep/ .SearchInput {
  width: 200px;
  input {
    height: 32px;
  }
}
/deep/ .searchSelect {
  width: 200px;
  div {
    height: 32px;
    input {
      height: 32px;
    }
  }
  .el-input__icon {
    line-height: 32px !important;
  }
}
/deep/ .el-pagination {
  text-align: right;
  margin-top: 20px;
}
.currentImage {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 200px;
}
.copyImg {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: #2d8cf0;
  cursor: pointer;
}
.ImgDialog {
  /deep/.el-dialog {
    padding-bottom: 20px;
  }
}
</style>
