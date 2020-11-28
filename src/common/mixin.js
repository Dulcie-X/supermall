import BackTop from "components/content/backTop/BackTop.vue";

export const backTopMixin = {
  components: {
    BackTop,
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      // scrollTo的第三个参数是ms
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
  }
}
