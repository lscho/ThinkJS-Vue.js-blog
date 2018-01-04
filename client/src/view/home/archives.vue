<<style> 
  .archives ul li{
    margin-top:15px;
  }
  .archives ul li a{
    color: #666;
  }
  .archives ul li .date{
    color: #999;
    font-size: 14px;
  }
</style>

<template>
<div class="container">
    <div class="col-group">
        <div class="col-8" id="main">
            <div class="res-cons archives">
              <ul>
                <li v-for="(item , index) in items" :key="index">
                  <router-link :to="{ path: 'post/'+item.slug }">{{item.title}}</router-link>
                  <span class="date">({{item.create_time|date}})</span>
                  </li>
              </ul>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import { content } from "@/api";
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    getList() {
      content.getList({ type: "archives" }).then(res => {
        this.items = res.data;
      });
    }
  },
  filters: {
    date: function(value) {
      if (!value) return "";
      return new Date(value * 1000).toDateString();
    }
  },
  mounted() {
    this.getList();
  }
};
</script>