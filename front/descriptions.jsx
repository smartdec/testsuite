const existenceTransferTest = (
  <div>
    <p><code>transfer()</code> function must be present in ERC20 token.</p>
    <p>This test calls <code>transfer()</code> function of token and expects <code>true</code> as a return value.</p>
    <h4>PseudoCode</h4>
    <pre>
    <code>
    // Account balances are sufficient <br/>
    function existenceTransferTest() external {"{"}<br/>
    {"    "}transfer(testAccounts[1], 1000, from: testAccounts[0]).expectEqual(true);<br/>
    }<br/>
    </code>
    </pre>
  </div>
);


const existenceApproveTest = (
  <div>
    <p><code>approve()</code> function must be present in ERC20 token.</p>
    <p>This test calls <code>approve()</code> function of token and expects <code>true</code> as a return value.</p>
    <h4>PseudoCode</h4>
    <pre>
    <code>
    function existenceApproveTest() external {"{"}<br/>
    {"    "}approve(testAccounts[1], 1000, from: testAccounts[0]).expectEqual(true);<br/>
    }
    </code>
    </pre>
  </div>
);


const existenceTransferFromTest = (
  <div>
    <p><code>transferFrom()</code> function must be present in ERC20 token.</p>
    <p>This test calls <code>approve()</code> and <code>transferFrom()</code> functions of the token and expects <code>true</code> as a return value.</p>
    <h4>PseudoCode</h4>
    <pre>
    <code>
    function existenceTransferFromTest() external {"{"}<br/>
    {"    "}approve(testAccounts[1], 1000, from: testAccounts[0]).expectEqual(true);<br/>
    {"    "}transferFrom(testAccounts[0], testAccounts[1], 1000, from: testAccounts[1]).expectEqual(true);<br/>
    }
    </code>
    </pre>
  </div>
);


const existenceAllowance = (
  <div>
    <p><code>allowance()</code> function must be present in ERC20 token.</p>
    <p>This test calls <code>allowance()</code> function of token and expects <code>uint</code> as a return value.</p>
    <h4>PseudoCode</h4>
    <pre>
    <code>
    function existenceAllowance() external {"{"}<br/>
    {"    "}allowance(testAccounts[0], testAccounts[1]).expectUInt();<br/>
    }
    </code>
    </pre>
  </div>
);


const existenceBalanceOf = (
  <div>
    <p><code>balanceOf()</code> function must be present in ERC20 token.</p>
    <p>This test calls <code>balanceOf()</code> function of token and expects <code>uint</code> as a return value.</p>
    <h4>PseudoCode</h4>
    <pre>
    <code>
    function existenceBalanceOf() external {"{"}<br/>
    {"    "}balanceOf(testAccounts[0]).expectUInt();<br/>
    }
    </code>
    </pre>
  </div>
);


const existenceTotalSupplyTest = (
  <div>
    <p><code>totalSupply()</code> function must be present in ERC20 token.</p>
    <p>This test calls <code>totalSupply()</code> function of token and expects <code>uint</code> as a return value.</p>
    <h4>PseudoCode</h4>
    <pre>
    <code>
    function existenceTotalSupplyTest() external {"{"}<br/>
    {"    "}totalSupply().expectUInt();<br/>
    }
    </code>
    </pre>
  </div>
);


const existenceName = (
  <div>
    <p><code>name()</code> function should be present in ERC20 token.</p>
    <p>This test calls <code>name()</code> function of token and expects non empty return value.</p>
    <h4>PseudoCode</h4>
    <pre>
    <code>
    function existenceName() external {"{"}<br/>
    {"    "}name().expectNonEmptyResult();<br/>
    }
    </code>
    </pre>
  </div>
);


const existenceSymbol = (
  <div>
    <p><code>symbol()</code> function should be present in ERC20 token.</p>
    <p>This test calls <code>symbol()</code> function of token and expects non empty return value.</p>
    <h4>PseudoCode</h4>
    <pre>
    <code>
    function existenceSymbol(address token) external {"{"}<br/>
    {"    "}symbol().expectNonEmptyResult();<br/>
    }
    </code>
    </pre>
  </div>
);


const existenceDecimals = (
  <div>
    <p><code>decimals()</code> function should be present in ERC20 token.</p>
    <p>This test calls <code>decimals()</code> function of token and expects <code>uint</code> as a return value.</p>
    <h4>PseudoCode</h4>
    <pre>
    <code>
    function existenceDecimals(address token) external {"{"}<br/>
    {"    "}uint tokenDecimals = decimals().expectUInt().loadUInt();<br/>
    {"    "}if (tokenDecimals >= 77) {"{"}  // decimals equal to 77 is too big<br/>
    {"        "}// test failed<br/>
    {"    "}}<br/>
    }
    </code>
    </pre>
  </div>
);


const basicApproveTest = (
  <div>
    <p>This test tries to approve tokens to other user and checks, whether the allowance has changed.</p>
    <h4>PseudoCode</h4>
    <pre>
    <code>
    function basicApproveTest() external {"{"}<br/>
    {"    "}approve(testAccounts[1], 1000, from: testAccounts[0]).expectEqual(true);<br/>
    {"    "}allowance(testAccounts[0], testAccounts[1]).expectEqual(1000);<br/>
    }
    </code>
    </pre>
  </div>
);


const approveZeroTokensTest = (
  <div>
    <p>This test tries to approve zero tokens to other user and checks, whether the allowance has changed.</p>
    <h4>PseudoCode</h4>
    <pre>
    <code>
    function approveZeroTokensTest() external {"{"}<br/>
    {"    "}approve(testAccounts[1], 0, from: testAccounts[0]).expectEqual(true);<br/>
    {"    "}allowance(testAccounts[0], testAccounts[1]).expectEqual(0);<br/>
    }
    </code>
    </pre>
  </div>
);


const allowanceRewriteTest = (
  <div>
    <p>This test tries to change the allowance two times in a row: set it to 1000 and then to 2000 token units.</p>
    <p>Note, that according to ERC20 token standard, despite the <a href="https://blog.smartdec.net/erc20-approve-issue-in-simple-words-a41aaf47bca6">ERC20 approve issue</a>, the contract itself should not enforce settings allowance to zero before changing it to other value.</p>
    <h4>PseudoCode</h4>
    <pre>
    <code>
    function allowanceRewriteTest() external {"{"}<br/>
    {"    "}approve(testAccounts[1], 1000, from: testAccounts[0]).expectEqual(true);<br/>
    {"    "}allowance(testAccounts[0], testAccounts[1]).expectEqual(1000);<br/>
    {"    "}approve(testAccounts[1], 2000, from: testAccounts[0]).expectEqual(true);<br/>
    {"    "}allowance(testAccounts[0], testAccounts[1]).expectEqual(2000);<br/>
    }
    </code>
    </pre>
  </div>
);


const basicTransferTest = (
  <div>
    <p>This test tries to transfer 1000 token units from one user to another, assuming the balances are sufficient.</p>
    <p>Note, that this test checks token transfering only between two specific addresses. Token owner can still have the ability to restrict access to this functionality for some users.</p>
    <h4>PseudoCode</h4>
    <pre>
    <code>
    function basicTransferTest() external {"{"}<br/>
    {"    "}uint balance0Old = balanceOf(testAccounts[0]).expectUInt().loadUInt();<br/>
    {"    "}uint balance1Old = balanceOf(testAccounts[1]).expectUInt().loadUInt();<br/>
<br/>
    {"    "}transfer(testAccounts[1], 1000, from: testAccounts[0]).expectEqual(true);<br/>
    {"    "}balanceOf(testAccounts[0]).expectEqual(balance0Old - 1000);<br/>
    {"    "}balanceOf(testAccounts[1]).expectEqual(balance1Old + 1000);<br/>
    }
    </code>
    </pre>
  </div>
);


const transferZeroTokensTest = (
  <div>
    <p>This test tries to transfer zero token units from one user to another.</p>
    <p>Note, that according to ERC20 token standard, transfer of 0 values MUST be treated as normal transfers.</p>
    <h4>PseudoCode</h4>
    <pre>
    <code>
    function transferZeroTokensTest() external {"{"}<br/>
    {"    "}uint balance0Old = balanceOf(testAccounts[0]).expectUInt().loadUInt();<br/>
    {"    "}uint balance1Old = balanceOf(testAccounts[1]).expectUInt().loadUInt();<br/>
<br/>
    {"    "}transfer(testAccounts[1], 0, from: testAccounts[0]).expectEqual(true);<br/>
    {"    "}balanceOf(testAccounts[0]).expectEqual(balance0Old);<br/>
    {"    "}balanceOf(testAccounts[1]).expectEqual(balance1Old);<br/>
    }
    </code>
    </pre>
  </div>
);


const transferMoreThanBalanceTest = (
  <div>
    <p>This test checks that the user cannot transfer more tokens than he/she has.</p>
    <p>Note, that according to ERC20 token standard, <code>transfer()</code> function SHOULD throw if the user does not have enough tokens.</p>
    <h4>PseudoCode</h4>
    <pre>
    <code>
    function transferMoreThanBalanceTest() external {"{"}<br/>
    {"    "}uint balance0Old = balanceOf(testAccounts[0]).expectUInt().loadUInt();<br/>
    {"    "}balanceOf(testAccounts[1]).expectUInt().loadUInt();<br/>
<br/>
    {"    "}transfer(testAccounts[1], balance0Old + 1, testAccounts[0]).expectRevert();<br/>
    }
    </code>
    </pre>
  </div>
);


const basicTransferFromTest = (
  <div>
    <p>In this test, the first user approves 1000 token units to the second one. Then, the second user tries to obtain these token units by calling <code>transferFrom()</code> function. As a result, the balance of the first user must decrease by 1000 token units, the balance of the second one must increase by 1000 token units and allowance must also be descreased.</p>
    <p>Note, that this test checks token transfering only between two specific addresses. Token owner can still have the ability to restrict access to this functionality for some users.</p>
    <h4>PseudoCode</h4>
    <pre>
    <code>
    function basicTransferFromTest() external {"{"}<br/>
    {"    "}uint balance0Old = balanceOf(testAccounts[0]).expectUInt().loadUInt();<br/>
    {"    "}uint balance1Old = balanceOf(testAccounts[1]).expectUInt().loadUInt();<br/>
<br/>
    {"    "}approve(testAccounts[1], 1000, testAccounts[0]).expectEqual(true);<br/>
    {"    "}transferFrom(testAccounts[0], testAccounts[1], 1000, from: testAccounts[1]).expectEqual(true);<br/>
<br/>
    {"    "}balanceOf(testAccounts[0], token).expectEqual(balance0Old - 1000);<br/>
    {"    "}balanceOf(testAccounts[1], token).expectEqual(balance1Old + 1000);<br/>
    {"    "}allowance(testAccounts[0], testAccounts[1]).expectEqual(0);<br/>
    }
    </code>
    </pre>
  </div>
);


const transferFromWithoutAllowanceTest = (
  <div>
    <p>This test checks, that the user cannot transfer tokens of the other user without allowance.</p>
    <h4>PseudoCode</h4>
    <pre>
    <code>
    function transferFromWithoutAllowanceTest() external {"{"}<br/>
    {"    "}approve(testAccounts[1], 0, from: testAccounts[0]).expectEqual(true);<br/>
    {"    "}balanceOf(testAccounts[0]).expectUInt().loadUInt();<br/>
    {"    "}balanceOf(testAccounts[1]).expectUInt().loadUInt();<br/>
<br/>
    {"    "}transferFrom(testAccounts[0], testAccounts[1], 1, from: testAccounts[1]).expectRevert();<br/>
    }
    </code>
    </pre>
  </div>
);


const transferFromNotFullAllowanceTest = (
  <div>
    <p>This function checks, that the user can obtain less than allowance of other users tokens.</p>
    <p>Note, that this test checks token transfering only between two specific addresses. Token owner can still have the ability to restrict access to this functionality for some users.</p>
    <h4>PseudoCode</h4>
    <pre>
    <code>
    function transferFromNotFullAllowanceTest() external {"{"}<br/>
    {"    "}uint balance0Old = balanceOf(testAccounts[0]).expectUInt().loadUInt();<br/>
    {"    "}uint balance1Old = balanceOf(testAccounts[1]).expectUInt().loadUInt();<br/>
<br/>
    {"    "}approve(testAccounts[1], 1000, from: testAccounts[0]).expectEqual(true);<br/>
    {"    "}transferFrom(testAccounts[0], testAccounts[1], 600, from: testAccounts[1]).expectEqual(true);<br/>
<br/>
    {"    "}balanceOf(testAccounts[0]).expectEqual(balance0Old - 600);<br/>
    {"    "}balanceOf(testAccounts[1]).expectEqual(balance1Old + 600);<br/>
    {"    "}allowance(testAccounts[0], testAccounts[1]).expectEqual(400);<br/>
    }
    </code>
    </pre>
  </div>
);


const transferFromChangeAllowanceTest = (
  <div>
    <p>This function checks, that the user can decrease the amount of tokens, he allowed other user to spend.</p>
    <p>Note, that this test checks token transfering only between two specific addresses. Token owner can still have the ability to restrict access to this functionality for some users.</p>
    <h4>PseudoCode</h4>
    <pre>
    <code>
    function transferFromChangeAllowanceTest() external {"{"}<br/>
    {"    "}approve(testAccounts[1], 1000, from: testAccounts[0]).expectEqual(true);<br/>
    {"    "}uint balance0Old = balanceOf(testAccounts[0]).expectUInt().loadUInt();<br/>
    {"    "}uint balance1Old = balanceOf(testAccounts[1]).expectUInt().loadUInt();<br/>
<br/>
    {"    "}transferFrom(testAccounts[0], testAccounts[1], 600, from: testAccounts[1]).expectEqual(true);<br/>
    {"    "}balanceOf(testAccounts[0]).expectEqual(balance0Old - 600);<br/>
    {"    "}balanceOf(testAccounts[1]).expectEqual(balance1Old + 600);<br/>
<br/>
    {"    "}approve(testAccounts[1], 0, from: testAccounts[0]).expectEqual(true);<br/>
    {"    "}transferFrom(testAccounts[0], testAccounts[1], 400, from: testAccounts[1]).expectRevert();<br/>
    }
    </code>
    </pre>
  </div>
);


const transferFromMoreThanAllowedTest = (
  <div>
    <p>This test checks, that the user cannot spend more than allowed tokens of other user.</p>
    <h4>PseudoCode</h4>
    <pre>
    <code>
    function transferFromMoreThanAllowedTest() external {"{"}<br/>
    {"    "}approve(testAccounts[1], 600, from: testAccounts[0]).expectEqual(true);<br/>
    {"    "}balanceOf(testAccounts[0]).expectUInt().loadUInt();<br/>
    {"    "}balanceOf(testAccounts[1]).expectUInt().loadUInt();<br/>
<br/>
    {"    "}transferFrom(testAccounts[0], testAccounts[1], 601, from: testAccounts[1]).expectRevert();<br/>
    }
    </code>
    </pre>
  </div>
);


const transferFromOnBehalf = (
  <div>
    <p>This test checks, that the user can transfer other users tokens not only to himself using <code>transferFrom()</code> function.</p>
    <p>Note, that this test checks token transfering only between specific addresses. Token owner can still have the ability to restrict access to this functionality for some users.</p>
    <h4>PseudoCode</h4>
    <pre>
    <code>
    function transferFromOnBehalf() external {"{"}<br/>
        uint balance0Old = balanceOf(testAccounts[0]).expectUInt().loadUInt();<br/>
        uint balance1Old = balanceOf(testAccounts[1]).expectUInt().loadUInt();<br/>
        uint balance2Old = balanceOf(testAccounts[2]).expectUInt().loadUInt();<br/>
<br/>
        approve(testAccounts[2], 1000, from: testAccounts[0]).expectEqual(true);<br/>
        transferFrom(testAccounts[0], testAccounts[1], 1000, from: testAccounts[2]).expectEqual(true);<br/>
        allowance(testAccounts[0], testAccounts[2], token).expectEqual(0);<br/>
        balanceOf(testAccounts[0]).expectEqual(balance0Old - 1000);<br/>
        balanceOf(testAccounts[1]).expectEqual(balance1Old + 1000);<br/>
        balanceOf(testAccounts[2]).expectEqual(balance2Old);<br/>
    }
    </code>
    </pre>
  </div>
);


const transferFromLowFunds = (
  <div>
    <p>This function checks, that the user cannot transfer other user's tokens if this other user does not have sufficient funds.</p>
    <h4>PseudoCode</h4>
    <pre>
    <code>
    function transferFromLowFunds() external {"{"}<br/>
    {"    "}uint balance0 = balanceOf(testAccounts[0]).expectUInt().loadUInt();<br/>
    {"    "}approve(testAccounts[1], balance0 + 1, from: testAccounts[0]).expectEqual(true);<br/>
    {"    "}transferFrom( <br/>
    {"        "}testAccounts[0],<br/>
    {"        "}testAccounts[1],<br/>
    {"        "}balance0 + 1,<br/>
    {"        "}from: testAccounts[1]<br/>
    {"    "}).expectRevert();<br/>
    }
    </code>
    </pre>
  </div>
);

const descriptions = {
  'existenceTransferTest': existenceTransferTest,
  'existenceApproveTest': existenceApproveTest,
  'existenceTransferFromTest': existenceTransferFromTest,
  'existenceAllowance': existenceAllowance,
  'existenceBalanceOf': existenceBalanceOf,
  'existenceTotalSupplyTest': existenceTotalSupplyTest,
  'existenceName': existenceName,
  'existenceSymbol': existenceSymbol,
  'existenceDecimals': existenceDecimals,
  'basicApproveTest': basicApproveTest,
  'approveZeroTokensTest': approveZeroTokensTest,
  'allowanceRewriteTest': allowanceRewriteTest,
  'basicTransferTest': basicTransferTest,
  'transferZeroTokensTest': transferZeroTokensTest,
  'transferMoreThanBalanceTest': transferMoreThanBalanceTest,
  'basicTransferFromTest': basicTransferFromTest,
  'transferFromWithoutAllowanceTest': transferFromWithoutAllowanceTest,
  'transferFromNotFullAllowanceTest': transferFromNotFullAllowanceTest,
  'transferFromChangeAllowanceTest': transferFromChangeAllowanceTest,
  'transferFromMoreThanAllowedTest': transferFromMoreThanAllowedTest,
  'transferFromOnBehalf': transferFromOnBehalf,
  'transferFromLowFunds': transferFromLowFunds,
};

let caseNameToHeader = {
  'existenceTransferTest': (<React.Fragment>Existence of <code>transfer()</code> function</React.Fragment>),
  'existenceApproveTest': (<React.Fragment>Existence of <code>approve()</code> function</React.Fragment>),
  'existenceTransferFromTest': (<React.Fragment>Existence of <code>transferFrom()</code> function</React.Fragment>),
  'existenceAllowance': (<React.Fragment>Existence of <code>allowance()</code> function</React.Fragment>),
  'existenceBalanceOf': (<React.Fragment>Existence of <code>balanceOf()</code> function</React.Fragment>),
  'existenceTotalSupplyTest': (<React.Fragment>Existence of <code>totalSupply()</code> function</React.Fragment>),
  'existenceName': (<React.Fragment>Existence of <code>name()</code> function</React.Fragment>),
  'existenceSymbol': (<React.Fragment>Existence of <code>symbol()</code> function</React.Fragment>),
  'existenceDecimals': (<React.Fragment>Existence of <code>decimals()</code> function</React.Fragment>),
  'basicApproveTest': (<React.Fragment>Basic <code>approve()</code> test</React.Fragment>),
  'approveZeroTokensTest': (<React.Fragment>Approve of zero tokens</React.Fragment>),
  'allowanceRewriteTest': (<React.Fragment>Allowance rewrite</React.Fragment>),
  'basicTransferTest': (<React.Fragment>Basic <code>trasfer()</code> test</React.Fragment>),
  'transferZeroTokensTest': (<React.Fragment>Transfer of zero tokens</React.Fragment>),
  'transferMoreThanBalanceTest': (<React.Fragment>Transfer more than balance</React.Fragment>),
  'basicTransferFromTest': (<React.Fragment>Basic <code>transferFrom()</code> test</React.Fragment>),
  'transferFromWithoutAllowanceTest': (<React.Fragment><code>transferFrom()</code> with zero allowance</React.Fragment>),
  'transferFromNotFullAllowanceTest': (<React.Fragment><code>transferFrom()</code> of not full allowance</React.Fragment>),
  'transferFromChangeAllowanceTest': (<React.Fragment>Decrease allowance after <code>transferFrom()</code></React.Fragment>),
  'transferFromMoreThanAllowedTest': (<React.Fragment><code>transferFrom()</code> more than allowed</React.Fragment>),
  'transferFromOnBehalf': (<React.Fragment>transfer tokens with <code>transferFrom()</code> to other user</React.Fragment>),
  'transferFromLowFunds': (<React.Fragment><code>transferFrom()</code> with insufficient funds</React.Fragment>),
}