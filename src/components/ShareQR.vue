<template>
  <section class="TTFontBold relative text-left sir-share-qr">
    <p class="overview-markline"></p>
    <div class="d-flex align-center">
      <div class="v-flex lens-share-cnt">
        <p>Missing assets?</p>
        <p>Scan the QR code<br>for more details</p>
        <div class="TTFontMedium share-copy-right">
          <p>© 2018 Mr.0x</p>
          <p>Powered by LORDLESS</p>
        </div>
      </div>
      <div class="share-qr"></div>
    </div>
  </section>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .sir-share-qr {
    padding-top: 40px;
    padding-bottom: 40px;
    color: #fff;
    >p {
      font-size: 16px;
      &:last-of-type {
        margin-top: 10px;
      }
    }
  }
  .overview-markline {
    position: absolute;
    top: 0;
    left: 0;
  }
  .lens-share-cnt {
    line-height: 1.2;
  }
  .share-qr {
    padding: 8px;
    width: 96px;
    height: 96px;
    background-color: #fff;
    border-radius: 5px;
    box-sizing: border-box;
  }
  .share-copy-right {
    margin-top: 10px;
    font-size: 12px;
    color: #ddd;
    // >p {
    //   &:last-of-type {
    //     margin-top: 8px;
    //   }
    // }
  }
</style>
