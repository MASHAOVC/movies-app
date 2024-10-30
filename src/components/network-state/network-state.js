function NetworkState({ onNetworkState }) {
  window.onoffline = () => {
    onNetworkState();
  };
  window.ononline = () => {
    onNetworkState();
  };

  return null;
}

export default NetworkState;
