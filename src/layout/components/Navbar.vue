<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown
        trigger="click"
        class="international"
        @command="handleSetLanguage"
      >
        <div>
          <svg-icon class-name="international-icon" icon-class="language" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :disabled="language === 'zh'" command="zh">
            中文
          </el-dropdown-item>
          <el-dropdown-item :disabled="language === 'en'" command="en">
            English
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{$t('HomePage.HomePageName')}}
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item>
            <span style="display:block;" @click="logout">{{$t('HomePage.quit')}}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
    language() {
      return this.$store.getters.language;
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    handleSetLanguage(lang) {
      this.$i18n.locale = lang;
      this.$store.dispatch("app/setLanguage", lang);
      if (this.$t("tip.successChange") === "更换成功") {
        this.$message({
          message: "更换成功",
          type: "success"
        });
      }else {
         this.$message({
          message: "Switch Language Success",
          type: "success"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }
  /deep/.international {
    display: inline-block;
    padding: 0 8px;
    font-size: 18px;
    color: #5a5e66;
    vertical-align: text-bottom;
    margin-bottom: 2px;
  }
  /deep/.svg-icon {
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
  .right-menu {
    float: right;
    height: 100%;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
