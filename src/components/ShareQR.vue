<template>
  <section class="TTFontBold relative text-left sir-share-qr">
    <p class="overview-markline"></p>
    <div class="d-flex align-center">
      <div class="v-flex lens-share-cnt">
        <p>Missing assets?</p>
        <p>Scan the QR code</p>
        <p>for more details</p>
        <div class="TTFontMedium share-copy-right">
          <p>© 2018 BLOCKLENS</p>
          <p>Powered by blocklens.io</p>
        </div>
      </div>
      <div class="share-qr">
        <div class="share-qr-container">
          <span id="qrcode" class="i-block"></span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  mounted () {
    this.$nextTick(() => {
      return new QRCode(document.getElementById('qrcode'), {
        text: location.href,
        width: 360,
        height: 360,
        colorDark: '#7D72F0',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
    })
  }
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
    width: 136px;
    height: 136px;
    background-color: #fff;
    border-radius: 5px;
    box-sizing: border-box;
    // >span {
    //   width: 100%;
    //   height: 100%;
    // }
    // img {
    //   transform: scale(.5);
    //   transform-origin: 0 0;
    // }
  }
  .share-qr-container {
    width: 100%;
    height: 100%;
    >span {
      transform: scale(.33);
      transform-origin: 0 0;
    }
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
