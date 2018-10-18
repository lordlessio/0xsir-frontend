<template>
  <footer class="sir-footer">
    <p class="footer-markline"></p>
    <h2>SUBSCRIBE TO OUR NEWSLETTER</h2>
    <p class="footer-desc">The latest Mr.0x news, articles, and resources, sent straight to your inbox every month.</p>
    <a href="http://eepurl.com/dsLYcr" target="_blank" class="d-flex footer-subscribe-eamil">
      <p class="v-flex footer-subscribe-input">
        <input aria-label="subscribe email" disabled type="text" placeholder="Your email"/>
      </p>
      <span class="TTFontBold i-block">Subscribe</span>
    </a>
    <div class="footer-links">
      <p>Links</p>
      <ul>
        <li class="d-flex footer-links-item">
          <span class="i-block line-height-0 footer-link-logo footer-lordless-logo">
            <svg>
              <use xlink:href="#lordless-logo"/>
            </svg>
          </span>
          <span class="v-flex">Decentralized task distribution platform with game as carrier</span>
        </li>
      </ul>
    </div>
    <p class="footer-copyright">© 2018 Mr.0x</p>
  </footer>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .sir-footer {
    padding-bottom: 48px;
    color: #fff;
    h2 {
      font-size: 16px;
    }
  }
  .footer-markline {
    margin-bottom: 37px;
    margin-left: 5%;
    width: 90%;
    height: 1px;
    background-image: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.40) 52.86%, rgba(255,255,255,0) 100%);
  }
  .footer-desc {
    margin-top: 40px;
    margin-bottom: 20px;
    font-size: 16px;
  }
  .footer-subscribe-eamil {
    margin-top: 20px;
    max-width: 350px;
    >span {
      padding: 15px 18px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      background-color: #fff;
        color: #2C00C2;
    }
  }
  .footer-subscribe-input {
    padding: 0 15px;
    color: #BDB9FD;
    background-color: #726BFF;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    overflow: hidden;
    >input {
      width: 100%;
      height: 100%;
      padding: 0;
      border: none;
      font-family: $--font-TTNormsMedium;
      font-size: 16px;
      background-color: transparent;
      color: inherit;
      outline: none;
      &::placeholder {
        color: inherit;
      }
    }
  }

  .footer-links {
    margin-top: 40px;
    font-size: 14px;
  }
  .footer-links-item {
    margin-top: 15px;
    color: #BDB9FD;
  }
  .footer-link-logo {
    margin-right: 10px;
  }
  .footer-lordless-logo {
    padding: 5px;
    width: 24px;
    height: 24px;
    background-color: #776aff;
    border-radius: 100%;
    overflow: hidden;
    box-sizing: border-box;
    >svg {
      width: 100%;
      height: 100%;
      fill: #fff;
    }
  }

  .footer-copyright {
    margin-top: 40px;
    font-size: 14px;
  }
</style>
