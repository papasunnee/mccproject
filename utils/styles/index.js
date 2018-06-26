export const loaderStyles = `
  .loader {
    border: 3px solid #f3f3f3;
    border-top: 3px solid #0c6053;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`
