<template>
   
    <div class="messageBox">
        <h2>{{title}}</h2>
        <p>{{con}}</p>
        <div>
            <div v-if="cancel" @touchstart="handleCancel">{{cancel}}</div>
            <div v-if="ok" @touchstart="handleOk" class="qh">{{ok}}</div>
        </div>
    </div>
    
</template>

<script>
export default {
    name:'MessageBox',
}
</script>

<style scoped>

.messageBox{
    height: 120px;
    width: 200px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 3px 3px 3px #cecece;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -60px 0 0 -100px;
    background: #fefefe;
}
.messageBox h2{
    text-align: center;
    line-height: 40px;
    font-size: 18px;
    border-bottom: 1px dashed #cecece;
}
.messageBox p{
    text-align: center;
    line-height: 40px;
}
.messageBox>div{
    display: flex;
    width: 100%;
    border-top:1px solid #cecece;
    position: absolute;
    bottom: 0;
}
.messageBox>div div{
    flex: 1;
    text-align: center;
    border-right: 1px solid #ccc;
    line-height: 30px;
}
.messageBox .qh{
    border-right: none;
}
</style>
