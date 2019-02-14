<template>
  <div class="home-main">
    <Row :gutter="10">
      <Col :md="24" :lg="24">
      <Row class-name="home-page-row1" :gutter="10">
        <Col :md="6" :lg="6" :style="{marginBottom: '10px',height:'400px'}">
        <Card style="height:100%;">
          <p slot="title">个人信息</p>
          <Row type="flex" class="user-infor">
            <Col span="12">
            <Row class-name="made-child-con-middle" type="flex" align="middle">
              <Avatar class="avatar" :src="userInfo.avator" />
            </Row>
              </Col>
              <Col span="12" style="padding-left:6px;">
              <Row class-name="made-child-con-middle" type="flex" align="middle">
                <div>
                  <b class="card-user-infor-name">{{userInfo.username}}</b>
                </div>
              </Row>
              </Col>
            </Row>
            <div class="line-gray"></div>
            <Row class="margin-top-8">
              <Col span="8">
              <p class="notwrap">上次登录:</p>
              </Col>
              <Col span="16" class="padding-left-8">{{userInfo.last_login_time|date}}</Col>
            </Row>
        </Card>
        </Col>
        <Col :md="6" :lg="6" :style="{marginBottom: '10px',height:'400px'}">
        <Card style="height:100%;">
          <p slot="title">最新发布</p>
          <Timeline>
            <TimelineItem v-for="(v,i) in archives" :key="v.id" v-if="i<5">
              <p class="time">{{v.create_time|date}}</p>
              <p class="content" v-html="v.title"></p>
            </TimelineItem>
          </Timeline>
        </Card>
        </Col>
        <Col :md="12" :lg="12" :style="{marginBottom: '10px',height:'400px'}">
        <Card style="height:100%;">
          <p slot="title">分类统计</p>
          <div id="category" style="height:400px;">
          </div>
        </Card>
        </Col>
      </Row>
      </Col>
      <Col :md="12" :lg="12">
      <Card style="height:100%;">
        <p slot="title">发布频率</p>
        <div id="archives" style="height:400px;">
        </div>
      </Card>
      </Col>
      <Col :md="12" :lg="12">
      <Card style="height:100%;">
        <p slot="title">热门文章</p>
        <div id="hot" style="height:400px;">
        </div>
      </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { content,category } from "@/api";
import { Row, Col, Card, Timeline, TimelineItem,Avatar } from 'iview';
import echarts from 'echarts';
export default {
  components: {
    Row,
    Col,
    Card,
    Timeline,
    TimelineItem,
    Avatar
  },
  computed: {
    ...mapState({
      userInfo: state => state.admin.user.info
    })
  },
  filters: {
    date: function(value) {
      if (!value) return "";
      return new Date(value * 1000).toLocaleString();
    }
  },
  data() {
    return {
      archives: []
    }
  },
  mounted() {
    this.setHotMap();
    this.setArchivesMap();
    this.setCategoryMap();
  },
  methods: {
    setHotMap() {
      let myChart = echarts.init(document.getElementById('hot'));
      content.getList({ 'type': 'hot' }).then(res => {
        let xAxisData = [];
        let seriesData = [];
        for (let i in res.data) {
          xAxisData.push(res.data[i].slug);
          seriesData.push(res.data[i].view);
        }
        myChart.setOption({
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: { data: xAxisData, axisLine: { lineStyle: { color: '#495060' } } },
          yAxis: { axisLine: { lineStyle: { color: '#495060' } } },
          series: [{ name: '点击次数', type: 'bar', barWidth: 30, data: seriesData }]
        });
      });
    },
    setArchivesMap() {
      let myChart = echarts.init(document.getElementById('archives'));
      content.getList({ 'type': 'archives' }).then(res => {
        this.archives = res.data;
        let monthsData = {};
        let xAxisData = [];
        let seriesData = [];
        let max = 10;
        for (let i in res.data) {
          let date = new Date(res.data[i].create_time * 1000);
          let key = date.getFullYear() + '-' + ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1));
          monthsData[key] = monthsData[key] ? monthsData[key] + 1 : 1;
          if (monthsData[key] > max) {
            max = monthsData[key];
          }
        }
        let date = new Date();
        let nearThree = [];
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        for (let i = 5; i >= 0; i--) {
          let key;
          if (month - i > 0) {
            key = year + '-' + ((month - i) > 9 ? (month - i) : '0' + (month - i));
          } else {
            key = (year - 1) + '-' + ((month - i + 12) > 9 ? (month - i + 12) : '0' + (month - i + 12));
          }
          xAxisData.push(key);
          seriesData.push(monthsData[key] ? monthsData[key] : 0);
        }
        myChart.setOption({
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: xAxisData,
            axisTick: {
              alignWithLabel: true
            }
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
            name: '当月发布',
            type: 'bar',
            barWidth: '60%',
            data: seriesData
          }]
        });

      });
    },
    setCategoryMap() {
      let myChart = echarts.init(document.getElementById('category'));
      category.getList().then(res => {
        let legendData = [];
        let seriesData = [];
        for (let i in res.data) {
          legendData.push(res.data[i].name);
          seriesData.push({
            value:res.data[i].count,
            name:res.data[i].name
          });
        }
        myChart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: legendData
          },
          series: [{
            name: '分类统计',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: seriesData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        });
      });
    }
  }
};

</script>
