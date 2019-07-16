'use strict';

const e = React.createElement;


class Network extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      networkVersion: window.ethereum.networkVersion
    }
    ethereum.on('networkChanged', (networkVersion) => {
      this.setState({networkVersion: networkVersion});
    });
    ethereum.autoRefreshOnNetworkChange = false;
  }
  render() {
    let tooltipText = "Network is taken from metamask. If you want to use a different one, change it there.";

    let networkName = networkNameByVersion[this.state.networkVersion];
    if (networkName === undefined) {
      networkName = "unknown";
    }
    return (
      <div className="network">
        current network: <div className="tooltip">{networkName}<span className="tooltiptext">{tooltipText}</span></div>
      </div>
    );
  }
}


class HeaderPanel extends React.Component {
  componentDidMount() {
    ethereum.enable();
  }

  render() {
    return (
      <div className="header">
        <div className="header-left">
          <div className="logo">
            <a href="index.html">SmartDec</a>
          </div>
          <Network />
        </div>
        <div className="header-right">
          <form className="search" action="report.html">
            <input type="text" placeholder="token address" name="token" className="input-search"/>
            <input type="submit" className="btn-search" value="Search"/>
          </form>
        </div>
      </div>
    );
  }
}

let networkNameByVersion = {
  1: 'mainnet',
  3: 'ropsten',
  42: 'kovan',
}

ReactDOM.render(<HeaderPanel />, document.getElementById("header"));