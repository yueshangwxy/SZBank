<template>
    <div class="dashboard-container">
        <!-- <PanelGroup/> -->
        <DashBoard />
        <updatePass1 ref="pass"/>
    </div>
</template>

<script>

    // import PanelGroup from './panelGroup'
    import DashBoard from './indicatorBoard'
    import Cookies from 'js-cookie'

    import updatePass1 from '@eladmin/views/system/user/center/updatePass'
    import { mapGetters } from 'vuex'

    /**
     * 记录访问，只有页面刷新或者第一次加载才会记录
     */
    /*count().then(res => {
    })*/

    export default {
        name: 'Dashboard',
        components: {
            updatePass1,
            // PanelGroup,
            DashBoard
        },
        data() {
            return {
                isAdmin: true,
                baseUrl: ''
            }
        },
        computed: {},
        mounted() {
            if (Cookies.get('defaultPass') === 'default') {
                this.$confirm('您目前使用的是初始密码，是否修改密码', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // this.dialog = true
                    this.$refs.pass.dialog = true
                    // console.log(this.$refs.pass.dialog)
                }).catch(() => {
                    // console.log('000')
                    Cookies.remove('defaultPass')
                })
            }
            console.log('======userinfo========>', this.user())
        },

        methods: {
            ...mapGetters(['getSmartbi', 'user'])
        }
    }
</script>
