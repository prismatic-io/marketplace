const headStyles = /* html */ `<style>
  .pio__modal {
    backdrop-filter: blur(10px);
    background: rgb(119 119 119 / 29%);
    bottom: 0;
    display: block;
    left: 0;
    opacity: 0;
    position: fixed;
    right: 0;
    top: 0;
    transition: all 0.3s ease-in;
    visibility: hidden;
    z-index: 9999;
  }
  .pio__modal.pio__modal--is_visible {
    opacity: 1;
    visibility: visible;
  }
  .pio__dialog {
    background: #fff;
    border-radius: 4px;
    bottom: 0;
    height: 80vh;
    left: 0;
    margin: auto;
    overflow: hidden;
    position: absolute;
    right: 0;
    top: 0;
    width: 80vw;
  }
  .pio__closeBtn {
    all: unset;
    cursor: pointer;
    position: absolute;
    right: 1.5em;
    top: 1.3em;
  }
  .pio__iframe {
    height: 100%
  }
</style>`;

export default headStyles;
