<<style>
    .time-line{
        padding-top:40px;
    }
    .time-line .time{
        font-size: 14px;
    }
    .time-line .content{
        padding-left: 5px;
        font-size: 14px;
    }
</style>

<template>
<div class="container">
	<div class="col-group">
		<div class="col-8" id="main">
			<div class="res-cons">
                <Timeline class="time-line">
                    <TimelineItem  v-for="(item , index) in items" :key="index">
                        <p class="time">{{item.create_time|date}}</p>
                        <p class="content">
                            <router-link :to="{ path: 'post/'+item.slug }">{{item.title}}</router-link>
                        </p>
                    </TimelineItem>
                </Timeline>
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
      content.getList({type:'archives'}).then(res => {
        this.items = res.data;
      });
    }
  },
  filters: {
    date: function(value) {
      if (!value) return "";
      return new Date(value * 1000).toLocaleString();
    }
  },
  mounted() {
    this.getList();
  }
};
</script>