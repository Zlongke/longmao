<template>
    <div id="detailContrainer" class="transition-movie">
        <Header title="影片详情">
            <i class="iconfont icon-right" @touchstart="toBack"></i>
        </Header>
        <Loading v-if="isLoading"/>
		<div v-else id="content" class="contentDetail">
			<div class="detail_list">
				<div class="detail_list_bg" :style="{'background-image':'url('+detailMovie.img.replace(/w\.h/,'148.208')+')'}"></div>
				<div class="detail_list_filter"></div>
				<div class="detail_list_content">
					<div class="detail_list_img">
						<img :src="detailMovie.img | setWH('148.208')" alt="">
					</div>
					<div class="detail_list_info">
						<h2>{{detailMovie.nm}}</h2>
						<p>{{detailMovie.enm}}</p>
						<p>{{detailMovie.sc}}</p>
						<p>{{detailMovie.cat}}</p>
						<p>{{detailMovie.src}} / {{detailMovie.dur}}分钟</p>
						<p>{{detailMovie.pubDesc}}</p>
					</div>
				</div>
			</div>
			<div class="detail_intro">
                <h5>内容简介：</h5>
				<p>{{detailMovie.dra}}</p>
			</div>
            <div class="swiper-wap">
			<div class="detail_player swiper-container" ref="detail_player">
				<h5>剧照</h5>
                <ul class="swiper-wrapper">
					<li class="swiper-slide" v-for="(item,i) in detailMovie.photos" :key="i">
						<div>
							<img :src="item | setWH('400.200')" alt="" @click="toImg(i)">
						</div>
					</li>
				</ul>
                
			</div>
            </div>
             
                 
		</div>
        <div class="detail-foot">
            <h3>选座购票</h3>
        </div>
	</div>
</template>

<script>
import Vue from 'vue'
import { ImagePreview } from 'vant';
Vue.use(ImagePreview);
import Header from '@/components/Header';
export default {
    name:'Detail',
    components:{
        Header
    },
    data() {
        return {
            detailMovie:{},
            isLoading:true
        }
    },
    props:['movieId'],
    methods: {
        toBack(){
            this.$router.go(-1)
        },
        toImg(i){
            var photos = this.detailMovie.photos
            var setPhotos = []
            for (let i = 0; i < photos.length; i++) {
                setPhotos.push(photos[i].replace(/w\.h/,200.112))
                
            }
            console.log(i)
            ImagePreview({
                images: setPhotos,
                startPosition: i,
                
            });
        }
    },
    mounted() {
        //console.log(this.movieId)
        this.axios.get('/api/detailmovie?movieId='+this.movieId).then((data)=>{
            var msg = data.data.msg
            if (msg === 'ok') {
                this.isLoading = false
                this.detailMovie = data.data.data.detailMovie
                this.$nextTick(()=>{
                    new Swiper(this.$refs.detail_player,{
                        slidesPerView : "auto",
                        freeMode : true,
                        freeModeSticky: true,
                        slideToClickedSlide:true,
                        
                    })
                })
            }
            
        })
        
    },
   
}
</script>

<style scoped>
#detailContrainer{ position: absolute; left:0; top:0; z-index: 100; width:100%; min-height:100%; background:white; display: flex;flex-direction: column;height: 100%;}
.transition-movie{animation:0.3s moveDetail}
@keyframes moveDetail{
    0%{transform: translateX(100%)}
    100%{transform: translateX(0)}
}
#content{margin-bottom: 0;display: block;}
#content .detail_list{ height:200px; width:100%; position: relative;overflow: hidden;}
.detail_list .detail_list_bg{ width:100%; height:100%; background: 0 40%; filter: blur(20px); background-size:cover; position: absolute; left: 0; top: 0;border-radius: 0 0 30% 30%;}
.detail_list .detail_list_filter{ width:100%; height:100%; position: absolute;background-color: #40454d;opacity: .3; position: absolute; left: 0; top: 0; z-index: 1;border-radius: 0 0 30% 30%;}
.detail_list .detail_list_content{ display: flex; width:100%; height:100%; position: absolute; left: 0; top: 0; z-index: 2;}
.detail_list .detail_list_img{ width:108px; height: 150px; border: solid 1px #f0f2f3; margin:20px;}
.detail_list .detail_list_img img{ width:100%; height: 100%;}
.detail_list .detail_list_info{ margin-top: 20px;}
.detail_list .detail_list_info h2{ font-size: 20px; color:white; font-weight: normal; line-height: 40px;}
.detail_list .detail_list_info p{ color:white; line-height: 20px; font-size: 14px; color:#ccc;}
#content .detail_intro{ padding: 10px;border-bottom: 1px solid #cecece}
#content .detail_intro h5{line-height: 30px}
#content .detail_player{ margin:20px;}
#content .detail_player h5{line-height: 30px}
.detail_player .swiper-slide{ width:200px; height:112px;margin-right: 3px; text-align: center; font-size: 14px;}
.detail_player .swiper-slide img{ width:100%; margin-bottom: 5px;}
.detail_player .swiper-slide p:nth-of-type(2){ color:#999;} 
.detail-foot{
    height: 45px;
    width: 100%;
    
    
    color: #fff;
    background: #a7cd1a;
    border-radius: 5px 5px 0 0 ;
}
.detail-foot{
    line-height: 45px;
    text-align: center;
    font-size: 16px;
}
/* .swiper-wap{
    height: 200px;
} */
</style>
