const headStyles = /* html */ `<style>
  .modal {
    visibility: hidden;
    opacity: 0;
    transition: all 0.3s ease-in;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    background: rgb(119 119 119 / 29%);
    backdrop-filter: blur(10px);
    z-index: 9999;
  }

  .modal.is-visible {
    visibility: visible;
    opacity: 1;
  }

  .modal-dialog {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    width: 80vw;
    height: 80vh;
    margin: auto;
    border-radius: 4px;
    overflow: hidden;
  }

  .close-modal {
    all: unset;
    cursor: pointer;
    position: absolute;
    right: 1.5em;
    top: 1.3em;
  }

  .iframe-container {
    height: 100%
  }
</style>`;

export default headStyles;
