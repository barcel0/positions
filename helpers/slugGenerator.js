const slugGenerator = (contractName) => { //gets 'BITCOIN - CME', returns 'bitcoin-cme';
  return contractName
    .toLowerCase()
    .replace(/#2 /g,'2-')
    .replace(/%/g,'')
    .replace(/\(/g,'')
    .replace(/\)/g,'')
    .replace(/\>/g,'')
    .replace(/\</g,'')
    .replace(/ # /g,'-')
    .replace(/#/g,'-')
    .replace(/\$/g,'USD')
    .replace(/\€/g,'EUR')
    .replace(/\./g,'')
    .replace(/ \/ /g,'')
    .replace(/,/g,'')
    .replace(/ - /g, '-')
    .replace(/- /g, '-')
    .replace(/ -/g, '-')
    .replace(/ /g, '-')
    ;
}

module.exports = slugGenerator;