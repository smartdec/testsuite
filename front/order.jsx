'use strict';

const e = React.createElement;
const Collapse = ReactCollapse;

function Step(props) {
  return (
    <div className="step">
      <div className="step-header" onClick={props.onClick}>
        <p>{props.header}</p>
      </div>
      <Collapse isOpened={props.isOpened}>
        <div className="step-content">
          {props.content}
        </div>
      </Collapse>
    </div>
  );
}

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      tokenAddrInputValue: "0x0",
      tokenAddr: "0x0",
    };
  }

  setStep(stepNum) {
    this.setState({
      step: stepNum,
    });
    if (stepNum == 2) {
      this.onStep2();
    }
  }

  handleTokenAddrInputValueChange(newTokenAddrInputValue) {
    this.setState({
      tokenAddrInputValue: newTokenAddrInputValue,
    });
  }

  handleStepClick(stepNum) {
    if (this.state.step === stepNum) {
      this.setStep(0);
      return;
    }
    this.setStep(stepNum);
  }

  handleTokenAddrClick() {
    if (web3.isAddress(this.state.tokenAddrInputValue)) {
      this.setState((state, props) => ({
        step: 1,
        tokenAddr: state.tokenAddrInputValue
      }), () => {this.setStep(2);});
      return;
    }
    this.props.setNotification(
      "Invalid token address",
      "Please, specify valid token address",
      "alert"
    );
  }

  handleApproveClick() {
    let tokenContract = web3js.eth.contract(ERC20ABI).at(this.state.tokenAddr);
    let testSuiteAddr = this.getTestSuiteAddr();
    if (testSuiteAddr === undefined) {
      return;
    }
    tokenContract.approve.sendTransaction(testSuiteAddr, 1000, (err, res) => {
      this.props.setNotification(
        "Waiting for approve transaction!",
        "After the approve transaction will be mined, you can proceed to ordering.",
        "info"
      );
      this.waitForTransactionReceipt(res, () => {
        this.props.setNotification(
          "Well done!",
          "Allowance is enough, now you are ready to order ERC20 compliance report. Just click order button!",
          "successfull"
        );
        this.setStep(3)
      });
    });
  }

  handleOrderClick() {
    let testSuiteAddr = this.getTestSuiteAddr();
    if (testSuiteAddr === undefined) {
      return;
    }
    let testSuite = web3js.eth.contract(testSuiteABI).at(testSuiteAddr);
    testSuite.check.sendTransaction(this.state.tokenAddr, {gas: 4000000}, (err, res) => {
      let reportLink = 'report.html?token=' + this.state.tokenAddr;
      this.props.setNotification(
        "Waiting for order transaction!",
        (
          <p>After the order transaction will be mined, you will be redirected to the page with results.
           If this does not happen, you can see results <a href={reportLink}>here</a></p>
        ),
        "info"
      );
      this.waitForTransactionReceipt(res, () => {
        window.location.href = 'report.html?token=' + this.state.tokenAddr;
      });
    });
  }

  onStep2() {
    this.props.setNotification(
      "Checking allowance",
      "We are checking allowance, you will be asked to increase it if the allowance is not enough",
      "info"
    );
    let tokenContract = web3js.eth.contract(ERC20ABI).at(this.state.tokenAddr);
    let testSuiteAddr = this.getTestSuiteAddr();
    if (testSuiteAddr === undefined) {
      return;
    }
    tokenContract.allowance.call(web3js.eth.accounts[0], testSuiteAddr, (err, res) => {
      if (res >= 1000) {
        this.props.setNotification(
          "Well done!",
          "Allowance is enough, now you are ready to order ERC20 compliance report. Just click submit function!",
          "successfull"
        );
        this.setStep(3);
      } else {
        this.props.setNotification(
          "Not enough approved tokens",
          "Please, approve 1000 tokens using button in step 2",
          "info"
        );
      }
    });
  }

  waitForTransactionReceipt(txhash, cb) {
    var filter = web3.eth.filter({from: 'latest', to: 'latest'});
    let cbCalled = false;
    filter.watch(function(error, result) {
        if (!error) {
            web3.eth.getTransactionReceipt(txhash, function(error, receipt) {
                if (receipt && receipt.transactionHash == txhash && !cbCalled) {
                  cbCalled = true;
                  filter.stopWatching();
                  cb();
                }
            });
        }
    });
  }

  getTestSuiteAddr() {
    let testSuiteAddr = testSuiteAddrByNetworkId[window.ethereum.networkVersion];
    if (testSuiteAddr === undefined) {
      if (window.ethereum.networkVersion === undefined) {
        this.props.setNotification(
          "Metamask error",
          "Metamask does not provide network version. Please, wait for a few seconds until metamask loads or try refreshing the page.",
          "alert"
        );
      } else {
        this.props.setNotification(
          "Unsupported network",
          "We do not currently support this network.",
          "alert"
        );
      }
    }
    return testSuiteAddr;
  }

  renderStep1() {
    let stepNum = 1;
    let stepContent = (
      <React.Fragment>
        <input
          type="text"
          placeholder="token address"
          className="input-token-addr"
          onChange={evt => this.handleTokenAddrInputValueChange(evt.target.value)}
        />
        <button onClick={() => {this.handleTokenAddrClick()}}>enter</button>
      </React.Fragment>
    );
    return (
      <Step
        header="step 1: enter token address"
        content={stepContent}
        isOpened={this.state.step == stepNum}
        onClick={() => this.handleStepClick(stepNum)}
      />
    );
  }

  renderStep2() {
    let stepNum = 2;
    let stepContent = (
      <React.Fragment>
        <p>We need small amount of tokens in order to test functions such as tranfer, approve and transferFrom. Note that these tokens WILL BE refunded to your account.</p>
        <button
          id="btn-approve"
          onClick={() => this.handleApproveClick()}>
          send approve transaction
        </button>
      </React.Fragment>
    );
    return (
      <Step
        header="step 2: approve 1000 token units"
        content={stepContent}
        isOpened={this.state.step == stepNum}
        onClick={() => this.handleStepClick(stepNum)}
      />
    );
  }

  renderStep3() {
    let stepNum = 3;
    let stepContent = (
      <React.Fragment>
        <p>Send order transaction to our special ordering contract. After checking the requirements, our contract will notify the backend about successfull payment transactions and tests will be run.</p>
        <button
          id="btn-order"
          onClick={() => this.handleOrderClick()}>
          order
        </button>
      </React.Fragment>
    );
    return (
      <Step
        header="step 3: order analysis"
        content={stepContent}
        isOpened={this.state.step == stepNum}
        onClick={() => this.handleStepClick(stepNum)}
      />
    );
  }

  render() {
    return (
      <div>
        {this.renderStep1()}
        {this.renderStep2()}
        {this.renderStep3()}
      </div>
    );
  }
}

class NotificationPanel extends React.Component {
  render() {
    let content = typeof this.props.content === "string" ? (<p>{this.props.content}</p>) : this.props.content;
    if (this.props.header !== '') {
      let className = "notification-panel " + this.props.type;
      return (
        <div className={className}>
          <div className="notification-header">
            <h4>{this.props.header}</h4>
          </div>
          <div className="notification-content">
          {content}
          </div>
        </div>
      );
    }
    return (<div></div>);
  }
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationHeader: "",
      notificationContent: "",
      notificationType: "info",
    }
  }

  setNotification(header, content, type) {
    this.setState({
      notificationHeader: header,
      notificationContent: content,
      notificationType: type,
    });
  }

  render() {
    return (
      <React.Fragment>
        <Order
          setNotification={(header, content, type) => {this.setNotification(header, content, type);}}
        />
        <NotificationPanel
          header={this.state.notificationHeader}
          content={this.state.notificationContent}
          type={this.state.notificationType}
        />
      </React.Fragment>
    );
  }
}

let web3js = undefined;
let testSuiteABI = JSON.parse('[{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "testResults","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "token","type": "address"}],"name": "check","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "nonpayable","type": "function"}]');
let testSuite;
let testSuiteAddrByNetworkId = {
  1: '0x1e7Aff4f505d2fa5E8D1f08659d4EeA9110abD8F',
  3: '0x34016BCF8aEdE81e193cfE12f8E4298516EEF186',
  42: '0x897179dD89FB07B1773B1f0E1371F13f754C78cD'
}
let ERC20ABI = JSON.parse('[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"name","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"totalSupply","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"decimals","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"symbol","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]');
if (typeof web3 !== 'undefined') {
  web3js = new Web3(web3.currentProvider);
} else {
  alert('no metamask detected');
}

ReactDOM.render(<Page />, document.getElementById("root"));
