<template>
  <section class="TTFontBold relative text-center sir-share-qr">
    <p class="overview-markline"></p>
    <p>Missing assets?</p>
    <p>Scan the QR code for more details</p>
    <span class="i-block share-qr"></span>
    <div class="TTFontMedium share-copy-right">
      <p>© 2018 Mr.0x</p>
      <p>Powered by LORDLESS</p>
    </div>
  </section>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .sir-share-qr {
    padding-top: 36px;
    padding-bottom: 48px;
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
  .share-qr {
    padding: 12px;
    width: 200px;
    height: 200px;
    margin-top: 10px;
    background-color: #ddd;
  }
  .share-copy-right {
    margin-top: 40px;
    font-size: 14px;
    >p {
      &:last-of-type {
        margin-top: 8px;
      }
    }
  }
</style>
