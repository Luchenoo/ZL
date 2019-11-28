<template>
  <div class="app-container">
    <span>{{$t('FacilityInfo.name')}}</span>
    <el-card style="margin-top:10px">
      <div class="searchBox">
        <el-form :inline="true" :model="formData" class="demo-form-inline" ref="formData">
          <el-form-item :label="$t('FacilityInfo.timeRange')" prop="time">
            <el-date-picker
              v-model="formData.time"
              type="datetimerange"
              :range-separator="$t('FacilityInfo.to')"
              :start-placeholder="$t('FacilityInfo.startDate')"
              :end-placeholder="$t('FacilityInfo.dateClose')"
              format="yyyy-MM-dd HH:mm:ss"
              class="datePicker"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item :label="$t('FacilityInfo.macAddress')" prop="macAddress">
            <el-input
              v-model="formData.macAddress"
              :placeholder="$t('FacilityInfo.macAddress')"
              class="searchInput"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('FacilityInfo.userName')" prop="userName">
            <el-input
              v-model="formData.userName"
              :placeholder="$t('FacilityInfo.userName')"
              class="searchInput"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('FacilityInfo.userUuid')" prop="userUUID" style="margin-left:24px"> 
            <el-input
              v-model="formData.userUUID"
              :placeholder="$t('FacilityInfo.userUuid')"
              class="searchInput"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('FacilityInfo.groupName')" prop="groupName" >
            <el-input
              v-model="formData.groupName"
              :placeholder="$t('FacilityInfo.groupName')"
              class="searchInput"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('FacilityInfo.identifyResultsValue')" prop="identifyResultsValue">
            <el-select
              v-model="formData.identifyResultsValue"
              :placeholder="$t('tip.select')"
              class="searchSelect"
            >
              <el-option
                v-for="item in identifyResults"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('FacilityInfo.loggingSourcesValue')"  prop="loggingSourcesValue">
            <el-select
              v-model="formData.loggingSourcesValue"
              :placeholder="$t('tip.select')"
              class="searchSelect"
            >
              <el-option
                v-for="item in loggingSources"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('FacilityInfo.identificationStateValue')" prop="identificationStateValue">
            <el-select
              v-model="formData.identificationStateValue"
              :placeholder="$t('tip.select')"
              class="searchSelect"
            >
              <el-option
                v-for="item in identificationState"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('FacilityInfo.recognitionModeValue')" prop="recognitionModeValue">
            <el-select
              v-model="formData.recognitionModeValue"
              :placeholder="$t('tip.select')"
              class="searchSelect"
            >
              <el-option
                v-for="item in recognitionMode"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="searchInfo">{{$t('FacilityInfo.search')}}</el-button>
            <el-button type="primary" size="small" @click="resetForm('formData')">{{$t('FacilityInfo.reset')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 表格 -->
      <el-table
        :data="FacilityInfo"
        border
        style="width: 100%"
        :header-cell-style="{
          'background-color': '#D8E0EA',
          color: '#909399',
          'font-weight': '400'
        }"
      >
        <el-table-column
          :label="$t('FacilityInfo.deviceName')"
          prop="deviceName"
          width="202"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="macAddress"
          :label="$t('FacilityInfo.FacilityInfoMacAddress')"
          width="199"
          align="center"
        >
        </el-table-column>
        <el-table-column  :label="$t('FacilityInfo.captureImageUrl')" align="center" width="80">
          <template slot-scope="scope">
            <img
              :src="scope.row.captureImageUrl"
              alt=""
              style="width:40px;height:36px"
            />
          </template>
        </el-table-column>
        <el-table-column :label="$t('FacilityInfo.ok')" align="center" width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.ok === true ? '' : 'danger'" size="small">
              {{ scope.row.ok === true ? $t("tip.success") : $t("tip.error")}}
            </el-tag>
            <el-tooltip
              class="item"
              effect="dark"
              :content="
                scope.row.ok === true
                  ? $t('FacilityInfo.matchingScore') + scope.row.confidence + '%'
                  : $t('FacilityInfo.unmatch')
              "
              placement="top-start"
            >
              <i class="el-icon-question"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column :label="$t('FacilityInfo.perosnImageUrl')" align="center" width="80">
          <template slot-scope="scope">
            <img
              :src="scope.row.perosnImageUrl"
              alt=""
              style="width:40px;height:36px"
            />
          </template>
        </el-table-column>
        <el-table-column :label="$t('FacilityInfo.user')"  align="center" width="199">
          <template slot-scope="scope">
            <span>{{scope.row.personName}}</span>
            <span class="prompt" v-show="scope.row.personUUid != null">({{ scope.row.personUuid }})</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('FacilityInfo.recognitionModeValue')"  align="center" width="199">
          <template slot-scope="scope">
            {{ scope.row.recogMode === 1 ? $t('FacilityInfo.onlineIdentify') : $t('FacilityInfo.FacilityInfoIdentify') }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('FacilityInfo.identificationStateValue')"  align="center" width="199">
          <template slot-scope="scope">
            {{ scope.row.recogStatus === "finished" ? $t('FacilityInfo.identified') : (scope.row.recogStatus === 'pending'? $t('FacilityInfo.unIdentified'):(scope.row.recogStatus === 'unbindException'?$t('FacilityInfo.UnboundGroupException'):(scope.row.recogStatus === 'detectException'?$t('FacilityInfo.AbnormalFaceDetection'):$t('FacilityInfo.FaceSearchAbnormal')))) }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('FacilityInfo.loggingSourcesValue')"  align="center" width="199">
          <template slot-scope="scope">
            {{scope.row.channel === 'http'? $t('FacilityInfo.APIToUpload'):$t('FacilityInfo.EquipmentDirectPassing')}}
          </template>
        </el-table-column>
        <el-table-column prop="channel" :label="$t('FacilityInfo.occurredTime')"  align="center">
          <template slot-scope="scope">
            {{scope.row. occurAt}}
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
        class="FacilityInfo"
        background
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getShebei } from "@/api/table";
export default {
  data() {
    return {
      FacilityInfo: [],
      total: 0,
      currentPage:1,
      // 查询对象
      formData: {
        time: "",
        macAddress: "",
        userName: "",
        userUUID: "",
        groupName: "",
        identifyResultsValue: "",
        loggingSourcesValue: "",
        identificationStateValue: "",
        recognitionModeValue: ""
      },
      identifyResults: [
        {
          value: '',
          label: this.$t('tip.unlimited')
        },
        {
          value: true,
          label: this.$t('tip.success')
        },
        {
          value: false,
          label: this.$t('tip.error')
        }
      ],

      loggingSources: [
        {
          value: "",
          label: "不限"
        },
        {
          value: "2",
          label: "API上传"
        },
        {
          value: "3",
          label: "设备上传"
        }
      ],
      identificationState: [
        {
          value: "",
          label: "不限"
        },
        {
          value: "2",
          label: "待识别"
        },
        {
          value: "3",
          label: "已识别"
        },
        {
          value: "4",
          label: "未绑定组异常"
        },
        {
          value: "5",
          label: "人脸检测异常"
        },
        {
          value: "6",
          label: "人脸搜索异常"
        }
      ],
      recognitionMode: [
        {
          value: "",
          label: "不限"
        },
        {
          value: "2",
          label: "在线识别"
        },
        {
          value: "3",
          label: "设备端识别"
        }
      ]
    };
  },
  created() {
    this.getFacility();
  },
  methods: {
    async getFacility() {
      const data = await getShebei({
        pageSize:10,
        pageNo:this.currentPage
      })
      if (data.status !== 200) {
         this.$notify.error({
          title: "",
          message: `<b style="  position: relative;
  top: -3px"> 获取设备信息失败 </b>`,
          dangerouslyUseHTMLString: true,
          duration:2000
        });
        return;
      }
      this.FacilityInfo = data.data.identifyList;
      this.total = data.data.total
    },
    async handleCurrentChange(val) {
      const data = await getShebei({
        pageSize:10,
        pageNo:val
      })
        if (data.status !== 200) {
         this.$notify.error({
          title: "",
          message: `<b style="  position: relative;
  top: -3px"> 获取设备信息失败 </b>`,
          dangerouslyUseHTMLString: true,
          duration:2000
        });
        return;
      }
      this.FacilityInfo = data.data.identifyList;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    async searchInfo() {
      const data = await getShebei({
        pageSize:10,
        pageNo:1,
        startDate:this.formData.time[0],
        endDate:this.formData.time[1],
        macAddress:this.formData.macAddress,
        perosnName:this.formData.userName,
        permissionUuid:this.formData.userUUID,
        groupName:this.formData.groupName,
        ok:this.formData.identifyResultsValue,
        channel:this.formData.loggingSourcesValue,
        recogStatus:this.formData.identificationStateValue,
        recogMode:this.formData.recognitionModeValue

      })
      if(data.data === '') {
        this.FacilityInfo = []
        this.total = 0
      }else {
        this.FacilityInfo = data.data.identifyList
        this.total = data.data.total
      }
      this.currentPage = 1
      
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.datePicker {
  width: 400px;
  height: 32px;
  /deep/.el-input__icon {
    height: 30px;
  }
  /deep/.el-range-separator {
    height: 30px;
  }
  /deep/.el-range-input {
    height: 30px;
  }
}
/deep/ .searchInput {
  width: 200px;
  /deep/.el-input__inner {
    height: 32px;
  }
}
/deep/ .searchSelect {
  width: 200px;
  /deep/.el-input__inner {
    height: 32px;
  }
}
.prompt {
  color: #999;
  font-size: 14px;
}
/deep/.FacilityInfo {
  text-align: right;
  margin-top: 20px
}
</style>