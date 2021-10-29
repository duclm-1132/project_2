<template>
  <div class="content" :class="{'position-left-48' : colapseClick}">
    <NuxtChild/>
  </div>
</template>
<script>
export default {
	props: {
		colapseClick: { type: Boolean, default: false }
	}
}
</script>
<style scoped>
.content {
	position: absolute;
	top: 48px;
	left: 178px;
	right: 0;
	bottom: 0;
	background-color: #f4f5f6;
	padding: 0 30px 0 20px;
}
.position-left-48 {
	left: 48px !important;
}
@media screen and (max-width: 1024px) {
	/* .content{
		top: 48px;
		left: 48px;
	} */
}
</style>
