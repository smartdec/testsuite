'use strict';

const e = React.createElement;
const Collapse = ReactCollapse;

function Description(props) {
  if (props.curTestCase) {
    return (
      <div className="description">
        <h3>{caseNameToHeader[props.curTestCase]}</h3>
        {descriptions[props.curTestCase]}
      </div>
    );
  }
  return (
    <div className="description"></div>
  );
}

function TestCase(props) {
  let className = "test-case";
  if (props.isActive) {
    className += " active";
  }
  if (props.testsWereRun) {
    className += props.successfull ? " successfull" : " failed"
  }
  return (
    <div className={className} onClick={() => props.onClick(props.name)}>
      {caseNameToHeader[props.name]}
    </div>
  );
}

class Section extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false
    };
  }

  onHeaderClick() {
    this.setState({isOpened: !this.state.isOpened});
  }

  renderTestCases(testCases) {
    let caseViews = [];
    for(var i=0; i < testCases.length; ++i) {
      let successfull;
      if (this.props.testResults.length !== 0) {
        let caseId = caseNameToId[testCases[i]]
        successfull = this.props.testResults[caseId].successfull;
      }
      caseViews.push(
        <TestCase
          name={testCases[i]}
          key={testCases[i]}
          onClick={(name) => this.props.handleTestCaseClick(name)}
          isActive={this.props.curTestCase === testCases[i]}
          successfull={successfull}
          testsWereRun={this.props.testsWereRun}
        />
      );
    }
    return caseViews;
  }

  render() {
    let headerClassName = "section-header";
    if (this.props.testsWereRun && this.props.testResults.length !== 0) {
      let successfull = true;
      for (var i=0; i < this.props.testCases.length; ++i) {
        let testId = caseNameToId[this.props.testCases[i]];
        successfull &= this.props.testResults[testId].successfull;
      }
      headerClassName += successfull ? " successfull" : " failed";
    }
    return (
      <div className="section">
        <div className={headerClassName} onClick={() => {this.onHeaderClick()}}>
          <span>{this.props.name}</span>
        </div>
        <Collapse isOpened={this.state.isOpened}>
          <div className="section-content">
            {this.renderTestCases(this.props.testCases)}
          </div>
        </Collapse>
      </div>
    );
  }
}

class SectionList extends React.Component {
  renderSectionList() {
    let sectionViews = [];
    for(var i=0; i < sections.length; ++i) {
      sectionViews.push(
        <Section
          name={sections[i]['name']}
          key={sections[i]['name']}
          testCases={sections[i]['testCases']}
          handleTestCaseClick={(name) => this.props.handleTestCaseClick(name)}
          curTestCase={this.props.curTestCase}
          testResults={this.props.testResults}
          testsWereRun={this.props.testsWereRun}
        />
      );
    }
    return sectionViews;
  }

  render() {
    return (
      <div className="section-list">
        {this.renderSectionList()}
      </div>
    );
  }
}

class ReportHeader extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="token-addr-header">
          <h3>Token address:</h3>
        </div>
        <div className="token-addr-value">
          <h3>{this.props.tokenAddr}</h3>
        </div>
      </div>
    );
  }
}

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curTestCase: "",
      testResults: [],
      tokenAddr: "",
      testsWereRun: undefined
    }

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (!web3.isAddress(token)) {
      alert('You have not specified any token address. Please, use search');
    } else {
      if (window.ethereum.networkVersion !== undefined) {
        this.setTestResults(token);
      }
      ethereum.on('networkChanged', (networkVersion) => {
        if (networkVersion !== undefined) {
          this.setTestResults(token);
        }
      });
    }
  }

  setTestResults(tokenAddr) {
    let testSuiteAddr = testSuiteAddrByNetworkId[window.ethereum.networkVersion];
    let testSuite = web3js.eth.contract(testSuiteABI).at(testSuiteAddr);
    testSuite.testResults.call(tokenAddr, (err, res) => {
      let newTestResults = JSON.parse(JSON.stringify(testResultScheme));
      let testsWereRun = this.parseTestResults(newTestResults, res.toString(2));
      this.setState({
        curTestCase: "",
        testResults: newTestResults,
        tokenAddr: tokenAddr,
        testsWereRun: testsWereRun
      });
    });
  }

  parseTestResults(newTestResults, testResults) {
    let testsWereRun = testResults[testResults.length-1] !== '0';
    if (!testsWereRun) {
      alert('No tests were run for specified token. Please, run them or reload page');
      return false;
    }
    for (let i = 0; i < testResults.length - 1; i += 1) {
      newTestResults[i].successfull = testResults[testResults.length - i - 2] == '1';
    }
    return true;
  }

  handleTestCaseClick(name) {
    this.setState({
      curTestCase: name
    });
  }

  render() {
    let tokenAddrText = this.state.tokenAddr;
    if (this.state.testsWereRun === false) {
      tokenAddrText += ' (not tests were run)';
    }
    return (
      <React.Fragment>
        <ReportHeader tokenAddr={tokenAddrText}/>
        <div className="row">
          <SectionList
            handleTestCaseClick={(name) => this.handleTestCaseClick(name)}
            curTestCase={this.state.curTestCase}
            testResults={this.state.testResults}
            testsWereRun={this.state.testsWereRun}
          />
          <Description curTestCase={this.state.curTestCase}/>
        </div>
      </React.Fragment>
    );
  }
}

let sections = [
  {'name': 'existence of functions', 'testCases': [
      'existenceTransferTest',
      'existenceApproveTest',
      'existenceTransferFromTest',
      'existenceAllowance',
      'existenceBalanceOf',
      'existenceTotalSupplyTest'
    ]
  },
  {'name': 'existence of optional functions', 'testCases': [
      'existenceName',
      'existenceSymbol',
      'existenceDecimals'
    ]
  },
  {'name': 'transfer()', 'testCases': [
      'basicTransferTest',
      'transferZeroTokensTest',
      'transferMoreThanBalanceTest'
    ]
  },
  {'name': 'approve()', 'testCases': [
      'basicApproveTest',
      'approveZeroTokensTest',
      'allowanceRewriteTest'
    ]
  },
  {'name': 'transferFrom()', 'testCases': [
      'basicTransferFromTest',
      'transferFromWithoutAllowanceTest',
      'transferFromNotFullAllowanceTest',
      'transferFromChangeAllowanceTest',
      'transferFromMoreThanAllowedTest',
      'transferFromOnBehalf',
      'transferFromLowFunds'
    ]
  },
];


let testResultScheme = [
  {name: 'existenceTransferTest', successfull: undefined},
  {name: 'existenceApproveTest', successfull: undefined},
  {name: 'existenceTransferFromTest', successfull: undefined},
  {name: 'existenceAllowance', successfull: undefined},
  {name: 'existenceBalanceOf', successfull: undefined},
  {name: 'existenceTotalSupplyTest', successfull: undefined},
  {name: 'existenceName', successfull: undefined},
  {name: 'existenceSymbol', successfull: undefined},
  {name: 'existenceDecimals', successfull: undefined},
  {name: 'basicApproveTest', successfull: undefined},
  {name: 'approveZeroTokensTest', successfull: undefined},
  {name: 'allowanceRewriteTest', successfull: undefined},
  {name: 'basicTransferTest', successfull: undefined},
  {name: 'transferZeroTokensTest', successfull: undefined},
  {name: 'transferMoreThanBalanceTest', successfull: undefined},
  {name: 'basicTransferFromTest', successfull: undefined},
  {name: 'transferFromWithoutAllowanceTest', successfull: undefined},
  {name: 'transferFromNotFullAllowanceTest', successfull: undefined},
  {name: 'transferFromChangeAllowanceTest', successfull: undefined},
  {name: 'transferFromMoreThanAllowedTest', successfull: undefined},
  {name: 'transferFromOnBehalf', successfull: undefined},
  {name: 'transferFromLowFunds', successfull: undefined},
]

let caseNameToId = {
  'existenceTransferTest': 0,
  'existenceApproveTest': 1,
  'existenceTransferFromTest': 2,
  'existenceAllowance': 3,
  'existenceBalanceOf': 4,
  'existenceTotalSupplyTest': 5,
  'existenceName': 6,
  'existenceSymbol': 7,
  'existenceDecimals': 8,
  'basicApproveTest': 9,
  'approveZeroTokensTest': 10,
  'allowanceRewriteTest': 11,
  'basicTransferTest': 12,
  'transferZeroTokensTest': 13,
  'transferMoreThanBalanceTest': 14,
  'basicTransferFromTest': 15,
  'transferFromWithoutAllowanceTest': 16,
  'transferFromNotFullAllowanceTest': 17,
  'transferFromChangeAllowanceTest': 18,
  'transferFromMoreThanAllowedTest': 19,
  'transferFromOnBehalf': 20,
  'transferFromLowFunds': 21
}


let web3js = undefined;
let testSuiteABI = JSON.parse('[{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "testResults","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "token","type": "address"}],"name": "check","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "nonpayable","type": "function"}]');
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

ReactDOM.render(<Report />, document.getElementById("root"));
