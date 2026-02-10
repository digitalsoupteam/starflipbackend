export const PvPGridAbi = [{
  "_format": "hh-sol-artifact-1",
  "contractName": "PvPGrid",
  "sourceName": "contracts/games/PvPGrid.sol",
  "abi": [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "target",
          "type": "address"
        }
      ],
      "name": "AddressEmptyCode",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "implementation",
          "type": "address"
        }
      ],
      "name": "ERC1967InvalidImplementation",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ERC1967NonPayable",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "FailedCall",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "needed",
          "type": "uint256"
        }
      ],
      "name": "InsufficientBalance",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InsufficientContractBalance",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InvalidBetAmount",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InvalidHouseEdge",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InvalidInitialization",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InvalidMatchStatus",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "MatchNotFound",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "MinGreaterThanMax",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NotInitializing",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "OnlyBackend",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "PlayerNotInMatch",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        }
      ],
      "name": "SafeERC20FailedOperation",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "UUPSUnauthorizedCallContext",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "slot",
          "type": "bytes32"
        }
      ],
      "name": "UUPSUnsupportedProxiableUUID",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint64",
          "name": "version",
          "type": "uint64"
        }
      ],
      "name": "Initialized",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "matchId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "creator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "bid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "cellCount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "token",
          "type": "address"
        }
      ],
      "name": "MatchCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "matchId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "winner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "MatchFinished",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "matchId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address[]",
          "name": "players",
          "type": "address[]"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "boardHash",
          "type": "bytes32"
        }
      ],
      "name": "MatchStarted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "matchId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "player",
          "type": "address"
        }
      ],
      "name": "PlayerJoined",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "implementation",
          "type": "address"
        }
      ],
      "name": "Upgraded",
      "type": "event"
    },
    {
      "stateMutability": "payable",
      "type": "fallback"
    },
    {
      "inputs": [],
      "name": "UPGRADE_INTERFACE_VERSION",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "matchId",
          "type": "uint256"
        }
      ],
      "name": "cancelMatch",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "cellCount",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "betAmount",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "referrer",
          "type": "address"
        }
      ],
      "name": "createMatch",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "matchId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "winner",
          "type": "address"
        }
      ],
      "name": "finishMatch",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getContractBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "matchId",
          "type": "uint256"
        }
      ],
      "name": "getMatchBoardHash",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "matchId",
          "type": "uint256"
        }
      ],
      "name": "getMatchInfo",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "createdAt",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "creator",
          "type": "address"
        },
        {
          "internalType": "address[]",
          "name": "players",
          "type": "address[]"
        },
        {
          "internalType": "uint256",
          "name": "bid",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "total",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "count",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "status",
          "type": "uint8"
        },
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "matchId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "player",
          "type": "address"
        }
      ],
      "name": "getPlayerBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "player",
          "type": "address"
        }
      ],
      "name": "getPlayerMatches",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getWaitingMatches",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "houseEdge",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_addressBook",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_backendWallet",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_minBetAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_maxBetAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "_houseEdge",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "_cellCount",
          "type": "uint8"
        }
      ],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "matchId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "referrer",
          "type": "address"
        }
      ],
      "name": "joinMatch",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "maxBetAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "minBetAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "proxiableUUID",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newBackendWallet",
          "type": "address"
        }
      ],
      "name": "setBackendWallet",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "_cellCount",
          "type": "uint8"
        }
      ],
      "name": "setCellCount",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "_houseEdge",
          "type": "uint8"
        }
      ],
      "name": "setHouseEdge",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_maxBetAmount",
          "type": "uint256"
        }
      ],
      "name": "setMaxBetAmount",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_minBetAmount",
          "type": "uint256"
        }
      ],
      "name": "setMinBetAmount",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "matchId",
          "type": "uint256"
        },
        {
          "internalType": "bytes32",
          "name": "boardHash",
          "type": "bytes32"
        }
      ],
      "name": "startMatch",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newImplementation",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "upgradeToAndCall",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "withdrawToTreasury",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ],
  "bytecode": "0x60a06040523073ffffffffffffffffffffffffffffffffffffffff1660809073ffffffffffffffffffffffffffffffffffffffff1681525034801561004357600080fd5b5061005261005760201b60201c565b6101de565b600061006761015b60201b60201c565b90508060000160089054906101000a900460ff16156100b2576040517ff92ee8a900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b67ffffffffffffffff80168160000160009054906101000a900467ffffffffffffffff1667ffffffffffffffff16146101585767ffffffffffffffff8160000160006101000a81548167ffffffffffffffff021916908367ffffffffffffffff1602179055507fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d267ffffffffffffffff60405161014f91906101c3565b60405180910390a15b50565b60008061016c61017560201b60201c565b90508091505090565b60007ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a0060001b905090565b600067ffffffffffffffff82169050919050565b6101bd816101a0565b82525050565b60006020820190506101d860008301846101b4565b92915050565b608051615679610207600039600081816136ae0152818161370301526139ad01526156796000f3fe60806040526004361061016a5760003560e01c80637c4b35cf116100d1578063cab11d5d1161008a578063e411153e11610064578063e411153e14610507578063f820201114610530578063fa93d9641461055b578063fa968eea146105985761016b565b8063cab11d5d14610488578063d02c8cdf146104b3578063d667dcd7146104dc5761016b565b80637c4b35cf146103685780637cfbc7a5146103a5578063ad3cb1cc146103ce578063bc7c34ba146103f9578063bc9685cf14610422578063c0d6d95d1461044b5761016b565b80634b561a16116101235780634b561a161461025f5780634f1ef286146102a457806352d1902d146102c05780636c188593146102eb5780636f9fb98a14610314578063751947ce1461033f5761016b565b80630c5597571461016d5780630d519080146101965780630edfe7ec146101c657806335868ab7146101ef57806343d8ed6a1461020b57806348032dea146102345761016b565b5b005b34801561017957600080fd5b50610194600480360381019061018f9190614048565b6105c3565b005b6101b060048036038101906101ab9190614109565b610716565b6040516101bd919061416b565b60405180910390f35b3480156101d257600080fd5b506101ed60048036038101906101e89190614186565b610f8a565b005b610209600480360381019061020491906141b3565b611134565b005b34801561021757600080fd5b50610232600480360381019061022d919061423c565b611859565b005b34801561024057600080fd5b50610249611ade565b604051610256919061433a565b60405180910390f35b34801561026b57600080fd5b506102866004803603810190610281919061435c565b611b36565b60405161029b99989796959493929190614465565b60405180910390f35b6102be60048036038101906102b9919061463f565b611ccc565b005b3480156102cc57600080fd5b506102d5611ceb565b6040516102e291906146aa565b60405180910390f35b3480156102f757600080fd5b50610312600480360381019061030d919061435c565b611d1e565b005b34801561032057600080fd5b50610329611e94565b604051610336919061416b565b60405180910390f35b34801561034b57600080fd5b50610366600480360381019061036191906146c5565b611e9c565b005b34801561037457600080fd5b5061038f600480360381019061038a9190614186565b6124f7565b60405161039c919061433a565b60405180910390f35b3480156103b157600080fd5b506103cc60048036038101906103c7919061435c565b61258e565b005b3480156103da57600080fd5b506103e36126ca565b6040516103f09190614784565b60405180910390f35b34801561040557600080fd5b50610420600480360381019061041b91906147a6565b612703565b005b34801561042e57600080fd5b5061044960048036038101906104449190614833565b612af2565b005b34801561045757600080fd5b50610472600480360381019061046d919061435c565b612fd8565b60405161047f91906146aa565b60405180910390f35b34801561049457600080fd5b5061049d61303b565b6040516104aa919061416b565b60405180910390f35b3480156104bf57600080fd5b506104da60048036038101906104d5919061435c565b613041565b005b3480156104e857600080fd5b506104f1613402565b6040516104fe9190614873565b60405180910390f35b34801561051357600080fd5b5061052e60048036038101906105299190614048565b613415565b005b34801561053c57600080fd5b50610545613570565b6040516105529190614873565b60405180910390f35b34801561056757600080fd5b50610582600480360381019061057d91906146c5565b613583565b60405161058f919061416b565b60405180910390f35b3480156105a457600080fd5b506105ad613624565b6040516105ba919061416b565b60405180910390f35b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630bd756bd6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561062e573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061065291906148cc565b73ffffffffffffffffffffffffffffffffffffffff16637582b19e336040518263ffffffff1660e01b815260040161068a91906148f9565b60006040518083038186803b1580156106a257600080fd5b505afa1580156106b6573d6000803e3d6000fd5b5050505060328160ff1611156106f8576040517f7064607800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b80600460006101000a81548160ff021916908360ff16021790555050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c6b052666040518163ffffffff1660e01b8152600401602060405180830381865afa158015610784573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107a89190614952565b73ffffffffffffffffffffffffffffffffffffffff16634d7f334e306040518263ffffffff1660e01b81526004016107e091906148f9565b602060405180830381865afa1580156107fd573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061082191906149b7565b610860576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161085790614a56565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663abd13afe6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156108cb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108ef9190614ab4565b73ffffffffffffffffffffffffffffffffffffffff16637d6a5f7b6040518163ffffffff1660e01b815260040160006040518083038186803b15801561093457600080fd5b505afa158015610948573d6000803e3d6000fd5b5050505060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636940b5f06040518163ffffffff1660e01b8152600401602060405180830381865afa1580156109b7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109db9190614b1f565b73ffffffffffffffffffffffffffffffffffffffff1663554b9a0f856040518263ffffffff1660e01b8152600401610a1391906148f9565b60006040518083038186803b158015610a2b57600080fd5b505afa158015610a3f573d6000803e3d6000fd5b5050505060008073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1603610acd573490506000841480610a8957503484145b610ac8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610abf90614bbe565b60405180910390fd5b610b41565b83905060003414610b13576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b0a90614c50565b60405180910390fd5b610b403330838873ffffffffffffffffffffffffffffffffffffffff1661362a909392919063ffffffff16565b5b600254811080610b52575060035481115b15610b89576040517f9de3d44100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60056000815480929190610b9c90614c9f565b9190505550600060055490506000600660008381526020019081526020016000209050818160000181905550428160010181905550338160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600301339080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550828160040181905550828160050181905550600460019054906101000a900460ff1660ff16816006018190555060008160090160006101000a81548160ff02191690836002811115610cce57610ccd614ce7565b5b0217905550868160090160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550828160080160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002082908060018154018082558091505060019003906000526020600020016000909190919091505560088290806001815401808255809150506001900390600052602060002001600090919091909150553373ffffffffffffffffffffffffffffffffffffffff16827fac9ba5e19f2fef4bc8c15afecbfc7226841a0daefc676724379f3897bc4e54ad85600460019054906101000a900460ff168b604051610e4593929190614d51565b60405180910390a3600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614610f7d5760008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663cdc423446040518163ffffffff1660e01b8152600401602060405180830381865afa158015610eec573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f109190614dc6565b73ffffffffffffffffffffffffffffffffffffffff16637543e3f033876040518363ffffffff1660e01b8152600401610f4a929190614df3565b600060405180830381600087803b158015610f6457600080fd5b505af1158015610f78573d6000803e3d6000fd5b505050505b8193505050509392505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630bd756bd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610ff5573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061101991906148cc565b73ffffffffffffffffffffffffffffffffffffffff16637582b19e336040518263ffffffff1660e01b815260040161105191906148f9565b60006040518083038186803b15801561106957600080fd5b505afa15801561107d573d6000803e3d6000fd5b50505050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036110f0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110e790614e68565b60405180910390fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c6b052666040518163ffffffff1660e01b8152600401602060405180830381865afa15801561119f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111c39190614952565b73ffffffffffffffffffffffffffffffffffffffff16634d7f334e306040518263ffffffff1660e01b81526004016111fb91906148f9565b602060405180830381865afa158015611218573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061123c91906149b7565b61127b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161127290614a56565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663abd13afe6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156112e6573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061130a9190614ab4565b73ffffffffffffffffffffffffffffffffffffffff16637d6a5f7b6040518163ffffffff1660e01b815260040160006040518083038186803b15801561134f57600080fd5b505afa158015611363573d6000803e3d6000fd5b50505050600060066000858152602001908152602001600020905060008160000154036113bc576040517fb19089b800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600060028111156113d0576113cf614ce7565b5b8160090160009054906101000a900460ff1660028111156113f4576113f3614ce7565b5b1461142b576040517fd781e59600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8060090160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16146114bd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114b490614ed4565b60405180910390fd5b600081600401549050600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16036115415780341461153c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161153390614f40565b60405180910390fd5b6115b2565b60003414611584576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161157b90614c50565b60405180910390fd5b6115b13330838773ffffffffffffffffffffffffffffffffffffffff1661362a909392919063ffffffff16565b5b81600301339080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508082600501600082825461162b9190614f60565b92505081905550808260080160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208590806001815401808255809150506001900390600052602060002001600090919091909150553373ffffffffffffffffffffffffffffffffffffffff16857f87969bc7faf902221a147b95ceba76e011c5efb0339a0a8ee7a2bb82d9cfbbd660405160405180910390a3600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16146118525760008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663cdc423446040518163ffffffff1660e01b8152600401602060405180830381865afa1580156117c1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117e59190614dc6565b73ffffffffffffffffffffffffffffffffffffffff16637543e3f033856040518363ffffffff1660e01b815260040161181f929190614df3565b600060405180830381600087803b15801561183957600080fd5b505af115801561184d573d6000803e3d6000fd5b505050505b5050505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146118e0576040517f6bbaa1c100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60006006600084815260200190815260200160002090506000816000015403611935576040517fb19089b800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000600281111561194957611948614ce7565b5b8160090160009054906101000a900460ff16600281111561196d5761196c614ce7565b5b146119a4576040517fd781e59600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60018160090160006101000a81548160ff021916908360028111156119cc576119cb614ce7565b5b021790555081816007018190555060005b600880549050811015611a9b5783600882815481106119ff576119fe614f94565b5b906000526020600020015403611a8e5760086001600880549050611a239190614fc3565b81548110611a3457611a33614f94565b5b906000526020600020015460088281548110611a5357611a52614f94565b5b90600052602060002001819055506008805480611a7357611a72614ff7565b5b60019003818190600052602060002001600090559055611a9b565b80806001019150506119dd565b50827fff081b28ae89b87811a8dcb07f32d13d4b5e77404a53d7f9b11c108239a5df368260030184604051611ad1929190615112565b60405180910390a2505050565b60606008805480602002602001604051908101604052809291908181526020018280548015611b2c57602002820191906000526020600020905b815481526020019060010190808311611b18575b5050505050905090565b60008060006060600080600080600080600660008c815260200190815260200160002090506000816000015403611b99576040517fb19089b800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b806000015481600101548260020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16836003018460040154856005015486600601548760090160009054906101000a900460ff166002811115611bff57611bfe614ce7565b5b8860090160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1685805480602002602001604051908101604052809291908181526020018280548015611ca557602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311611c5b575b50505050509550995099509950995099509950995099509950509193959799909294969850565b611cd46136ac565b611cdd82613792565b611ce7828261388c565b5050565b6000611cf56139ab565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b905090565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630bd756bd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015611d89573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611dad91906148cc565b73ffffffffffffffffffffffffffffffffffffffff16637582b19e336040518263ffffffff1660e01b8152600401611de591906148f9565b60006040518083038186803b158015611dfd57600080fd5b505afa158015611e11573d6000803e3d6000fd5b5050505060008103611e4f576040517f9de3d44100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6003548110611e8a576040517fc9b4d6ba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8060028190555050565b600047905090565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611f23576040517f6bbaa1c100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60006006600084815260200190815260200160002090506000816000015403611f78576040517fb19089b800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60016002811115611f8c57611f8b614ce7565b5b8160090160009054906101000a900460ff166002811115611fb057611faf614ce7565b5b14611fe7576040517fd781e59600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000805b8260030180549050811015612083578373ffffffffffffffffffffffffffffffffffffffff1683600301828154811061202757612026614f94565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16036120765760019150612083565b8080600101915050611feb565b50806120bb576040517f0557c2f000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60006064600460009054906101000a900460ff1660ff1684600501546120e19190615142565b6120eb91906151b3565b905060008184600501546120ff9190614fc3565b905060028460090160006101000a81548160ff0219169083600281111561212957612128614ce7565b5b0217905550600073ffffffffffffffffffffffffffffffffffffffff168460090160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16036121ee57804710156121c0576040517f786e0a9900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6121e9818673ffffffffffffffffffffffffffffffffffffffff16613a3290919063ffffffff16565b612315565b808460090160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b815260040161224c91906148f9565b602060405180830381865afa158015612269573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061228d91906151f9565b10156122c5576040517f786e0a9900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61231485828660090160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16613afc9092919063ffffffff16565b5b8473ffffffffffffffffffffffffffffffffffffffff16867f20de984807640ee588cc1cf8a40b9e35644014057784cd50f435bbb8005b50d98360405161235c919061416b565b60405180910390a360005b84600301805490508110156124ee57600085600301828154811061238e5761238d614f94565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663cdc423446040518163ffffffff1660e01b8152600401602060405180830381865afa158015612426573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061244a9190614dc6565b73ffffffffffffffffffffffffffffffffffffffff1663e91a196b8288600401548960090160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518463ffffffff1660e01b81526004016124ae93929190615226565b600060405180830381600087803b1580156124c857600080fd5b505af11580156124dc573d6000803e3d6000fd5b50505050508080600101915050612367565b50505050505050565b6060600760008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002080548060200260200160405190810160405280929190818152602001828054801561258257602002820191906000526020600020905b81548152602001906001019080831161256e575b50505050509050919050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630bd756bd6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156125f9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061261d91906148cc565b73ffffffffffffffffffffffffffffffffffffffff16637582b19e336040518263ffffffff1660e01b815260040161265591906148f9565b60006040518083038186803b15801561266d57600080fd5b505afa158015612681573d6000803e3d6000fd5b5050505060025481116126c0576040517fc9b4d6ba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8060038190555050565b6040518060400160405280600581526020017f352e302e3000000000000000000000000000000000000000000000000000000081525081565b600061270d613b7b565b905060008160000160089054906101000a900460ff1615905060008260000160009054906101000a900467ffffffffffffffff1690506000808267ffffffffffffffff1614801561275b5750825b9050600060018367ffffffffffffffff16148015612790575060003073ffffffffffffffffffffffffffffffffffffffff163b145b90508115801561279e575080155b156127d5576040517ff92ee8a900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60018560000160006101000a81548167ffffffffffffffff021916908367ffffffffffffffff16021790555083156128255760018560000160086101000a81548160ff0219169083151502179055505b600073ffffffffffffffffffffffffffffffffffffffff168b73ffffffffffffffffffffffffffffffffffffffff1603612894576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161288b906152a9565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168a73ffffffffffffffffffffffffffffffffffffffff1603612903576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016128fa90615315565b60405180910390fd5b60328760ff161115612941576040517f7064607800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000890361297b576040517f9de3d44100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8789106129b4576040517fc9b4d6ba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8a6000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555089600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550886002819055508760038190555086600460006101000a81548160ff021916908360ff16021790555085600460016101000a81548160ff021916908360ff1602179055506000600581905550612a89613b8f565b8315612ae55760008560000160086101000a81548160ff0219169083151502179055507fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d26001604051612adc9190615384565b60405180910390a15b5050505050505050505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630bd756bd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015612b5d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612b8191906148cc565b73ffffffffffffffffffffffffffffffffffffffff1663f6e31f8f336040518263ffffffff1660e01b8152600401612bb991906148f9565b60006040518083038186803b158015612bd157600080fd5b505afa158015612be5573d6000803e3d6000fd5b5050505060008111612c2c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612c23906153eb565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614612d585760008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636940b5f06040518163ffffffff1660e01b8152600401602060405180830381865afa158015612ccb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612cef9190614b1f565b73ffffffffffffffffffffffffffffffffffffffff1663554b9a0f836040518263ffffffff1660e01b8152600401612d2791906148f9565b60006040518083038186803b158015612d3f57600080fd5b505afa158015612d53573d6000803e3d6000fd5b505050505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603612e6257804711612dc5576040517f786e0a9900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b612e5d60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166361d027b36040518163ffffffff1660e01b8152600401602060405180830381865afa158015612e33573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612e579190615420565b82613a32565b612fd4565b6000829050818173ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401612ea191906148f9565b602060405180830381865afa158015612ebe573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612ee291906151f9565b11612f19576040517f786e0a9900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b612fd260008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166361d027b36040518163ffffffff1660e01b8152600401602060405180830381865afa158015612f87573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612fab9190615420565b838373ffffffffffffffffffffffffffffffffffffffff16613afc9092919063ffffffff16565b505b5050565b600080600660008481526020019081526020016000209050600081600001540361302e576040517fb19089b800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8060070154915050919050565b60035481565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146130c8576040517f6bbaa1c100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000600660008381526020019081526020016000209050600081600001540361311d576040517fb19089b800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000600281111561313157613130614ce7565b5b8160090160009054906101000a900460ff16600281111561315557613154614ce7565b5b1461318c576040517fd781e59600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60005b816003018054905081101561330e5760008260030182815481106131b6576131b5614f94565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060008360080160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050600073ffffffffffffffffffffffffffffffffffffffff168460090160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16036132af576132aa818373ffffffffffffffffffffffffffffffffffffffff16613a3290919063ffffffff16565b6132ff565b6132fe82828660090160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16613afc9092919063ffffffff16565b5b5050808060010191505061318f565b5060005b6008805490508110156133d057826008828154811061333457613333614f94565b5b9060005260206000200154036133c357600860016008805490506133589190614fc3565b8154811061336957613368614f94565b5b90600052602060002001546008828154811061338857613387614f94565b5b906000526020600020018190555060088054806133a8576133a7614ff7565b5b600190038181906000526020600020016000905590556133d0565b8080600101915050613312565b5060028160090160006101000a81548160ff021916908360028111156133f9576133f8614ce7565b5b02179055505050565b600460009054906101000a900460ff1681565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630bd756bd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015613480573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906134a491906148cc565b73ffffffffffffffffffffffffffffffffffffffff16637582b19e336040518263ffffffff1660e01b81526004016134dc91906148f9565b60006040518083038186803b1580156134f457600080fd5b505afa158015613508573d6000803e3d6000fd5b5050505060008160ff1611613552576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401613549906154bf565b60405180910390fd5b80600460016101000a81548160ff021916908360ff16021790555050565b600460019054906101000a900460ff1681565b60008060066000858152602001908152602001600020905060008160000154036135d9576040517fb19089b800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8060080160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205491505092915050565b60025481565b6136a6848573ffffffffffffffffffffffffffffffffffffffff166323b872dd86868660405160240161365f939291906154df565b604051602081830303815290604052915060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050613b99565b50505050565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff16148061375957507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16613740613c3b565b73ffffffffffffffffffffffffffffffffffffffff1614155b15613790576040517fe07c8dba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630bd756bd6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156137fd573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061382191906148cc565b73ffffffffffffffffffffffffffffffffffffffff16637582b19e336040518263ffffffff1660e01b815260040161385991906148f9565b60006040518083038186803b15801561387157600080fd5b505afa158015613885573d6000803e3d6000fd5b5050505050565b8173ffffffffffffffffffffffffffffffffffffffff166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa9250505080156138f457506040513d601f19601f820116820180604052508101906138f1919061552b565b60015b61393557816040517f4c9c8ce300000000000000000000000000000000000000000000000000000000815260040161392c91906148f9565b60405180910390fd5b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b811461399c57806040517faa1d49a400000000000000000000000000000000000000000000000000000000815260040161399391906146aa565b60405180910390fd5b6139a68383613c92565b505050565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff1614613a30576040517fe07c8dba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b80471015613a795747816040517fcf479181000000000000000000000000000000000000000000000000000000008152600401613a70929190615558565b60405180910390fd5b6000808373ffffffffffffffffffffffffffffffffffffffff1683604051613aa0906155b2565b60006040518083038185875af1925050503d8060008114613add576040519150601f19603f3d011682016040523d82523d6000602084013e613ae2565b606091505b509150915081613af657613af581613d05565b5b50505050565b613b76838473ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8585604051602401613b2f9291906155c7565b604051602081830303815290604052915060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050613b99565b505050565b600080613b86613d49565b90508091505090565b613b97613d74565b565b600080602060008451602086016000885af180613bbc576040513d6000823e3d81fd5b3d925060005191505060008214613bd7576001811415613bf3565b60008473ffffffffffffffffffffffffffffffffffffffff163b145b15613c3557836040517f5274afe7000000000000000000000000000000000000000000000000000000008152600401613c2c91906148f9565b60405180910390fd5b50505050565b6000613c697f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b613db4565b60000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b613c9b82613dbe565b8173ffffffffffffffffffffffffffffffffffffffff167fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b60405160405180910390a2600081511115613cf857613cf28282613e8b565b50613d01565b613d00613f0f565b5b5050565b600081511115613d1757805160208201fd5b6040517fd6bda27500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60007ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a0060001b905090565b613d7c613f4c565b613db2576040517fd7e6bcf800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b6000819050919050565b60008173ffffffffffffffffffffffffffffffffffffffff163b03613e1a57806040517f4c9c8ce3000000000000000000000000000000000000000000000000000000008152600401613e1191906148f9565b60405180910390fd5b80613e477f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b613db4565b60000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60606000808473ffffffffffffffffffffffffffffffffffffffff1684604051613eb5919061562c565b600060405180830381855af49150503d8060008114613ef0576040519150601f19603f3d011682016040523d82523d6000602084013e613ef5565b606091505b5091509150613f05858383613f6c565b9250505092915050565b6000341115613f4a576040517fb398979f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b6000613f56613b7b565b60000160089054906101000a900460ff16905090565b606082613f8157613f7c82613d05565b613ff3565b60008251148015613fa9575060008473ffffffffffffffffffffffffffffffffffffffff163b145b15613feb57836040517f9996b315000000000000000000000000000000000000000000000000000000008152600401613fe291906148f9565b60405180910390fd5b819050613ff4565b5b9392505050565b6000604051905090565b600080fd5b600080fd5b600060ff82169050919050565b6140258161400f565b811461403057600080fd5b50565b6000813590506140428161401c565b92915050565b60006020828403121561405e5761405d614005565b5b600061406c84828501614033565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006140a082614075565b9050919050565b6140b081614095565b81146140bb57600080fd5b50565b6000813590506140cd816140a7565b92915050565b6000819050919050565b6140e6816140d3565b81146140f157600080fd5b50565b600081359050614103816140dd565b92915050565b60008060006060848603121561412257614121614005565b5b6000614130868287016140be565b9350506020614141868287016140f4565b9250506040614152868287016140be565b9150509250925092565b614165816140d3565b82525050565b6000602082019050614180600083018461415c565b92915050565b60006020828403121561419c5761419b614005565b5b60006141aa848285016140be565b91505092915050565b6000806000606084860312156141cc576141cb614005565b5b60006141da868287016140f4565b93505060206141eb868287016140be565b92505060406141fc868287016140be565b9150509250925092565b6000819050919050565b61421981614206565b811461422457600080fd5b50565b60008135905061423681614210565b92915050565b6000806040838503121561425357614252614005565b5b6000614261858286016140f4565b925050602061427285828601614227565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6142b1816140d3565b82525050565b60006142c383836142a8565b60208301905092915050565b6000602082019050919050565b60006142e78261427c565b6142f18185614287565b93506142fc83614298565b8060005b8381101561432d57815161431488826142b7565b975061431f836142cf565b925050600181019050614300565b5085935050505092915050565b6000602082019050818103600083015261435481846142dc565b905092915050565b60006020828403121561437257614371614005565b5b6000614380848285016140f4565b91505092915050565b61439281614095565b82525050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6143cd81614095565b82525050565b60006143df83836143c4565b60208301905092915050565b6000602082019050919050565b600061440382614398565b61440d81856143a3565b9350614418836143b4565b8060005b8381101561444957815161443088826143d3565b975061443b836143eb565b92505060018101905061441c565b5085935050505092915050565b61445f8161400f565b82525050565b60006101208201905061447b600083018c61415c565b614488602083018b61415c565b614495604083018a614389565b81810360608301526144a781896143f8565b90506144b6608083018861415c565b6144c360a083018761415c565b6144d060c083018661415c565b6144dd60e0830185614456565b6144eb610100830184614389565b9a9950505050505050505050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61454c82614503565b810181811067ffffffffffffffff8211171561456b5761456a614514565b5b80604052505050565b600061457e613ffb565b905061458a8282614543565b919050565b600067ffffffffffffffff8211156145aa576145a9614514565b5b6145b382614503565b9050602081019050919050565b82818337600083830152505050565b60006145e26145dd8461458f565b614574565b9050828152602081018484840111156145fe576145fd6144fe565b5b6146098482856145c0565b509392505050565b600082601f830112614626576146256144f9565b5b81356146368482602086016145cf565b91505092915050565b6000806040838503121561465657614655614005565b5b6000614664858286016140be565b925050602083013567ffffffffffffffff8111156146855761468461400a565b5b61469185828601614611565b9150509250929050565b6146a481614206565b82525050565b60006020820190506146bf600083018461469b565b92915050565b600080604083850312156146dc576146db614005565b5b60006146ea858286016140f4565b92505060206146fb858286016140be565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561473f578082015181840152602081019050614724565b60008484015250505050565b600061475682614705565b6147608185614710565b9350614770818560208601614721565b61477981614503565b840191505092915050565b6000602082019050818103600083015261479e818461474b565b905092915050565b60008060008060008060c087890312156147c3576147c2614005565b5b60006147d189828a016140be565b96505060206147e289828a016140be565b95505060406147f389828a016140f4565b945050606061480489828a016140f4565b935050608061481589828a01614033565b92505060a061482689828a01614033565b9150509295509295509295565b6000806040838503121561484a57614849614005565b5b6000614858858286016140be565b9250506020614869858286016140f4565b9150509250929050565b60006020820190506148886000830184614456565b92915050565b600061489982614095565b9050919050565b6148a98161488e565b81146148b457600080fd5b50565b6000815190506148c6816148a0565b92915050565b6000602082840312156148e2576148e1614005565b5b60006148f0848285016148b7565b91505092915050565b600060208201905061490e6000830184614389565b92915050565b600061491f82614095565b9050919050565b61492f81614914565b811461493a57600080fd5b50565b60008151905061494c81614926565b92915050565b60006020828403121561496857614967614005565b5b60006149768482850161493d565b91505092915050565b60008115159050919050565b6149948161497f565b811461499f57600080fd5b50565b6000815190506149b18161498b565b92915050565b6000602082840312156149cd576149cc614005565b5b60006149db848285016149a2565b91505092915050565b7f47616d6520646f65736e277420657869737420696e2047616d654d616e61676560008201527f7200000000000000000000000000000000000000000000000000000000000000602082015250565b6000614a40602183614710565b9150614a4b826149e4565b604082019050919050565b60006020820190508181036000830152614a6f81614a33565b9050919050565b6000614a8182614095565b9050919050565b614a9181614a76565b8114614a9c57600080fd5b50565b600081519050614aae81614a88565b92915050565b600060208284031215614aca57614ac9614005565b5b6000614ad884828501614a9f565b91505092915050565b6000614aec82614095565b9050919050565b614afc81614ae1565b8114614b0757600080fd5b50565b600081519050614b1981614af3565b92915050565b600060208284031215614b3557614b34614005565b5b6000614b4384828501614b0a565b91505092915050565b7f42657420616d6f756e74206d757374206d61746368206d73672e76616c75652060008201527f666f72206e617469766520746f6b656e00000000000000000000000000000000602082015250565b6000614ba8603083614710565b9150614bb382614b4c565b604082019050919050565b60006020820190508181036000830152614bd781614b9b565b9050919050565b7f43616e6e6f742073656e6420455448207768656e2062657474696e672077697460008201527f6820746f6b656e73000000000000000000000000000000000000000000000000602082015250565b6000614c3a602883614710565b9150614c4582614bde565b604082019050919050565b60006020820190508181036000830152614c6981614c2d565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000614caa826140d3565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203614cdc57614cdb614c70565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b6000819050919050565b6000614d3b614d36614d318461400f565b614d16565b6140d3565b9050919050565b614d4b81614d20565b82525050565b6000606082019050614d66600083018661415c565b614d736020830185614d42565b614d806040830184614389565b949350505050565b6000614d9382614095565b9050919050565b614da381614d88565b8114614dae57600080fd5b50565b600081519050614dc081614d9a565b92915050565b600060208284031215614ddc57614ddb614005565b5b6000614dea84828501614db1565b91505092915050565b6000604082019050614e086000830185614389565b614e156020830184614389565b9392505050565b7f4e6577206261636b656e642077616c6c6574206973207a65726f210000000000600082015250565b6000614e52601b83614710565b9150614e5d82614e1c565b602082019050919050565b60006020820190508181036000830152614e8181614e45565b9050919050565b7f546f6b656e206d69736d61746368000000000000000000000000000000000000600082015250565b6000614ebe600e83614710565b9150614ec982614e88565b602082019050919050565b60006020820190508181036000830152614eed81614eb1565b9050919050565b7f42657420616d6f756e74206d757374206d61746368206d617463682062696400600082015250565b6000614f2a601f83614710565b9150614f3582614ef4565b602082019050919050565b60006020820190508181036000830152614f5981614f1d565b9050919050565b6000614f6b826140d3565b9150614f76836140d3565b9250828201905080821115614f8e57614f8d614c70565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6000614fce826140d3565b9150614fd9836140d3565b9250828203905081811115614ff157614ff0614c70565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fd5b600081549050919050565b60008190508160005260206000209050919050565b60008160001c9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061508661508183615046565b615053565b9050919050565b60006150998254615073565b9050919050565b6000600182019050919050565b60006150b882615026565b6150c281856143a3565b93506150cd83615031565b8060005b83811015615105576150e28261508d565b6150ec88826143d3565b97506150f7836150a0565b9250506001810190506150d1565b5085935050505092915050565b6000604082019050818103600083015261512c81856150ad565b905061513b602083018461469b565b9392505050565b600061514d826140d3565b9150615158836140d3565b9250828202615166816140d3565b9150828204841483151761517d5761517c614c70565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60006151be826140d3565b91506151c9836140d3565b9250826151d9576151d8615184565b5b828204905092915050565b6000815190506151f3816140dd565b92915050565b60006020828403121561520f5761520e614005565b5b600061521d848285016151e4565b91505092915050565b600060608201905061523b6000830186614389565b615248602083018561415c565b6152556040830184614389565b949350505050565b7f5f61646472657373426f6f6b206973207a65726f210000000000000000000000600082015250565b6000615293601583614710565b915061529e8261525d565b602082019050919050565b600060208201905081810360008301526152c281615286565b9050919050565b7f5f6261636b656e6457616c6c6574206973207a65726f21000000000000000000600082015250565b60006152ff601783614710565b915061530a826152c9565b602082019050919050565b6000602082019050818103600083015261532e816152f2565b9050919050565b6000819050919050565b600067ffffffffffffffff82169050919050565b600061536e61536961536484615335565b614d16565b61533f565b9050919050565b61537e81615353565b82525050565b60006020820190506153996000830184615375565b92915050565b7f5f616d6f756e74206973207a65726f2100000000000000000000000000000000600082015250565b60006153d5601083614710565b91506153e08261539f565b602082019050919050565b60006020820190508181036000830152615404816153c8565b9050919050565b60008151905061541a816140a7565b92915050565b60006020828403121561543657615435614005565b5b60006154448482850161540b565b91505092915050565b7f43656c6c20636f756e74206d7573742062652067726561746572207468616e2060008201527f3000000000000000000000000000000000000000000000000000000000000000602082015250565b60006154a9602183614710565b91506154b48261544d565b604082019050919050565b600060208201905081810360008301526154d88161549c565b9050919050565b60006060820190506154f46000830186614389565b6155016020830185614389565b61550e604083018461415c565b949350505050565b60008151905061552581614210565b92915050565b60006020828403121561554157615540614005565b5b600061554f84828501615516565b91505092915050565b600060408201905061556d600083018561415c565b61557a602083018461415c565b9392505050565b600081905092915050565b50565b600061559c600083615581565b91506155a78261558c565b600082019050919050565b60006155bd8261558f565b9150819050919050565b60006040820190506155dc6000830185614389565b6155e9602083018461415c565b9392505050565b600081519050919050565b6000615606826155f0565b6156108185615581565b9350615620818560208601614721565b80840191505092915050565b600061563882846155fb565b91508190509291505056fea264697066735822122002c99c2621151d334ad2883dddaf5e3f6777ad9545cc0b8adf408ffa00e9c42064736f6c634300081c0033",
  "deployedBytecode": "0x60806040526004361061016a5760003560e01c80637c4b35cf116100d1578063cab11d5d1161008a578063e411153e11610064578063e411153e14610507578063f820201114610530578063fa93d9641461055b578063fa968eea146105985761016b565b8063cab11d5d14610488578063d02c8cdf146104b3578063d667dcd7146104dc5761016b565b80637c4b35cf146103685780637cfbc7a5146103a5578063ad3cb1cc146103ce578063bc7c34ba146103f9578063bc9685cf14610422578063c0d6d95d1461044b5761016b565b80634b561a16116101235780634b561a161461025f5780634f1ef286146102a457806352d1902d146102c05780636c188593146102eb5780636f9fb98a14610314578063751947ce1461033f5761016b565b80630c5597571461016d5780630d519080146101965780630edfe7ec146101c657806335868ab7146101ef57806343d8ed6a1461020b57806348032dea146102345761016b565b5b005b34801561017957600080fd5b50610194600480360381019061018f9190614048565b6105c3565b005b6101b060048036038101906101ab9190614109565b610716565b6040516101bd919061416b565b60405180910390f35b3480156101d257600080fd5b506101ed60048036038101906101e89190614186565b610f8a565b005b610209600480360381019061020491906141b3565b611134565b005b34801561021757600080fd5b50610232600480360381019061022d919061423c565b611859565b005b34801561024057600080fd5b50610249611ade565b604051610256919061433a565b60405180910390f35b34801561026b57600080fd5b506102866004803603810190610281919061435c565b611b36565b60405161029b99989796959493929190614465565b60405180910390f35b6102be60048036038101906102b9919061463f565b611ccc565b005b3480156102cc57600080fd5b506102d5611ceb565b6040516102e291906146aa565b60405180910390f35b3480156102f757600080fd5b50610312600480360381019061030d919061435c565b611d1e565b005b34801561032057600080fd5b50610329611e94565b604051610336919061416b565b60405180910390f35b34801561034b57600080fd5b50610366600480360381019061036191906146c5565b611e9c565b005b34801561037457600080fd5b5061038f600480360381019061038a9190614186565b6124f7565b60405161039c919061433a565b60405180910390f35b3480156103b157600080fd5b506103cc60048036038101906103c7919061435c565b61258e565b005b3480156103da57600080fd5b506103e36126ca565b6040516103f09190614784565b60405180910390f35b34801561040557600080fd5b50610420600480360381019061041b91906147a6565b612703565b005b34801561042e57600080fd5b5061044960048036038101906104449190614833565b612af2565b005b34801561045757600080fd5b50610472600480360381019061046d919061435c565b612fd8565b60405161047f91906146aa565b60405180910390f35b34801561049457600080fd5b5061049d61303b565b6040516104aa919061416b565b60405180910390f35b3480156104bf57600080fd5b506104da60048036038101906104d5919061435c565b613041565b005b3480156104e857600080fd5b506104f1613402565b6040516104fe9190614873565b60405180910390f35b34801561051357600080fd5b5061052e60048036038101906105299190614048565b613415565b005b34801561053c57600080fd5b50610545613570565b6040516105529190614873565b60405180910390f35b34801561056757600080fd5b50610582600480360381019061057d91906146c5565b613583565b60405161058f919061416b565b60405180910390f35b3480156105a457600080fd5b506105ad613624565b6040516105ba919061416b565b60405180910390f35b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630bd756bd6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561062e573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061065291906148cc565b73ffffffffffffffffffffffffffffffffffffffff16637582b19e336040518263ffffffff1660e01b815260040161068a91906148f9565b60006040518083038186803b1580156106a257600080fd5b505afa1580156106b6573d6000803e3d6000fd5b5050505060328160ff1611156106f8576040517f7064607800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b80600460006101000a81548160ff021916908360ff16021790555050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c6b052666040518163ffffffff1660e01b8152600401602060405180830381865afa158015610784573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107a89190614952565b73ffffffffffffffffffffffffffffffffffffffff16634d7f334e306040518263ffffffff1660e01b81526004016107e091906148f9565b602060405180830381865afa1580156107fd573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061082191906149b7565b610860576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161085790614a56565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663abd13afe6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156108cb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108ef9190614ab4565b73ffffffffffffffffffffffffffffffffffffffff16637d6a5f7b6040518163ffffffff1660e01b815260040160006040518083038186803b15801561093457600080fd5b505afa158015610948573d6000803e3d6000fd5b5050505060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636940b5f06040518163ffffffff1660e01b8152600401602060405180830381865afa1580156109b7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109db9190614b1f565b73ffffffffffffffffffffffffffffffffffffffff1663554b9a0f856040518263ffffffff1660e01b8152600401610a1391906148f9565b60006040518083038186803b158015610a2b57600080fd5b505afa158015610a3f573d6000803e3d6000fd5b5050505060008073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1603610acd573490506000841480610a8957503484145b610ac8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610abf90614bbe565b60405180910390fd5b610b41565b83905060003414610b13576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b0a90614c50565b60405180910390fd5b610b403330838873ffffffffffffffffffffffffffffffffffffffff1661362a909392919063ffffffff16565b5b600254811080610b52575060035481115b15610b89576040517f9de3d44100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60056000815480929190610b9c90614c9f565b9190505550600060055490506000600660008381526020019081526020016000209050818160000181905550428160010181905550338160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600301339080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550828160040181905550828160050181905550600460019054906101000a900460ff1660ff16816006018190555060008160090160006101000a81548160ff02191690836002811115610cce57610ccd614ce7565b5b0217905550868160090160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550828160080160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002082908060018154018082558091505060019003906000526020600020016000909190919091505560088290806001815401808255809150506001900390600052602060002001600090919091909150553373ffffffffffffffffffffffffffffffffffffffff16827fac9ba5e19f2fef4bc8c15afecbfc7226841a0daefc676724379f3897bc4e54ad85600460019054906101000a900460ff168b604051610e4593929190614d51565b60405180910390a3600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614610f7d5760008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663cdc423446040518163ffffffff1660e01b8152600401602060405180830381865afa158015610eec573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f109190614dc6565b73ffffffffffffffffffffffffffffffffffffffff16637543e3f033876040518363ffffffff1660e01b8152600401610f4a929190614df3565b600060405180830381600087803b158015610f6457600080fd5b505af1158015610f78573d6000803e3d6000fd5b505050505b8193505050509392505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630bd756bd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610ff5573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061101991906148cc565b73ffffffffffffffffffffffffffffffffffffffff16637582b19e336040518263ffffffff1660e01b815260040161105191906148f9565b60006040518083038186803b15801561106957600080fd5b505afa15801561107d573d6000803e3d6000fd5b50505050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036110f0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110e790614e68565b60405180910390fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c6b052666040518163ffffffff1660e01b8152600401602060405180830381865afa15801561119f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111c39190614952565b73ffffffffffffffffffffffffffffffffffffffff16634d7f334e306040518263ffffffff1660e01b81526004016111fb91906148f9565b602060405180830381865afa158015611218573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061123c91906149b7565b61127b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161127290614a56565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663abd13afe6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156112e6573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061130a9190614ab4565b73ffffffffffffffffffffffffffffffffffffffff16637d6a5f7b6040518163ffffffff1660e01b815260040160006040518083038186803b15801561134f57600080fd5b505afa158015611363573d6000803e3d6000fd5b50505050600060066000858152602001908152602001600020905060008160000154036113bc576040517fb19089b800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600060028111156113d0576113cf614ce7565b5b8160090160009054906101000a900460ff1660028111156113f4576113f3614ce7565b5b1461142b576040517fd781e59600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8060090160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16146114bd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114b490614ed4565b60405180910390fd5b600081600401549050600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16036115415780341461153c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161153390614f40565b60405180910390fd5b6115b2565b60003414611584576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161157b90614c50565b60405180910390fd5b6115b13330838773ffffffffffffffffffffffffffffffffffffffff1661362a909392919063ffffffff16565b5b81600301339080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508082600501600082825461162b9190614f60565b92505081905550808260080160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208590806001815401808255809150506001900390600052602060002001600090919091909150553373ffffffffffffffffffffffffffffffffffffffff16857f87969bc7faf902221a147b95ceba76e011c5efb0339a0a8ee7a2bb82d9cfbbd660405160405180910390a3600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16146118525760008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663cdc423446040518163ffffffff1660e01b8152600401602060405180830381865afa1580156117c1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117e59190614dc6565b73ffffffffffffffffffffffffffffffffffffffff16637543e3f033856040518363ffffffff1660e01b815260040161181f929190614df3565b600060405180830381600087803b15801561183957600080fd5b505af115801561184d573d6000803e3d6000fd5b505050505b5050505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146118e0576040517f6bbaa1c100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60006006600084815260200190815260200160002090506000816000015403611935576040517fb19089b800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000600281111561194957611948614ce7565b5b8160090160009054906101000a900460ff16600281111561196d5761196c614ce7565b5b146119a4576040517fd781e59600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60018160090160006101000a81548160ff021916908360028111156119cc576119cb614ce7565b5b021790555081816007018190555060005b600880549050811015611a9b5783600882815481106119ff576119fe614f94565b5b906000526020600020015403611a8e5760086001600880549050611a239190614fc3565b81548110611a3457611a33614f94565b5b906000526020600020015460088281548110611a5357611a52614f94565b5b90600052602060002001819055506008805480611a7357611a72614ff7565b5b60019003818190600052602060002001600090559055611a9b565b80806001019150506119dd565b50827fff081b28ae89b87811a8dcb07f32d13d4b5e77404a53d7f9b11c108239a5df368260030184604051611ad1929190615112565b60405180910390a2505050565b60606008805480602002602001604051908101604052809291908181526020018280548015611b2c57602002820191906000526020600020905b815481526020019060010190808311611b18575b5050505050905090565b60008060006060600080600080600080600660008c815260200190815260200160002090506000816000015403611b99576040517fb19089b800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b806000015481600101548260020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16836003018460040154856005015486600601548760090160009054906101000a900460ff166002811115611bff57611bfe614ce7565b5b8860090160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1685805480602002602001604051908101604052809291908181526020018280548015611ca557602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311611c5b575b50505050509550995099509950995099509950995099509950509193959799909294969850565b611cd46136ac565b611cdd82613792565b611ce7828261388c565b5050565b6000611cf56139ab565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b905090565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630bd756bd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015611d89573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611dad91906148cc565b73ffffffffffffffffffffffffffffffffffffffff16637582b19e336040518263ffffffff1660e01b8152600401611de591906148f9565b60006040518083038186803b158015611dfd57600080fd5b505afa158015611e11573d6000803e3d6000fd5b5050505060008103611e4f576040517f9de3d44100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6003548110611e8a576040517fc9b4d6ba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8060028190555050565b600047905090565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611f23576040517f6bbaa1c100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60006006600084815260200190815260200160002090506000816000015403611f78576040517fb19089b800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60016002811115611f8c57611f8b614ce7565b5b8160090160009054906101000a900460ff166002811115611fb057611faf614ce7565b5b14611fe7576040517fd781e59600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000805b8260030180549050811015612083578373ffffffffffffffffffffffffffffffffffffffff1683600301828154811061202757612026614f94565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16036120765760019150612083565b8080600101915050611feb565b50806120bb576040517f0557c2f000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60006064600460009054906101000a900460ff1660ff1684600501546120e19190615142565b6120eb91906151b3565b905060008184600501546120ff9190614fc3565b905060028460090160006101000a81548160ff0219169083600281111561212957612128614ce7565b5b0217905550600073ffffffffffffffffffffffffffffffffffffffff168460090160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16036121ee57804710156121c0576040517f786e0a9900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6121e9818673ffffffffffffffffffffffffffffffffffffffff16613a3290919063ffffffff16565b612315565b808460090160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b815260040161224c91906148f9565b602060405180830381865afa158015612269573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061228d91906151f9565b10156122c5576040517f786e0a9900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61231485828660090160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16613afc9092919063ffffffff16565b5b8473ffffffffffffffffffffffffffffffffffffffff16867f20de984807640ee588cc1cf8a40b9e35644014057784cd50f435bbb8005b50d98360405161235c919061416b565b60405180910390a360005b84600301805490508110156124ee57600085600301828154811061238e5761238d614f94565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663cdc423446040518163ffffffff1660e01b8152600401602060405180830381865afa158015612426573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061244a9190614dc6565b73ffffffffffffffffffffffffffffffffffffffff1663e91a196b8288600401548960090160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518463ffffffff1660e01b81526004016124ae93929190615226565b600060405180830381600087803b1580156124c857600080fd5b505af11580156124dc573d6000803e3d6000fd5b50505050508080600101915050612367565b50505050505050565b6060600760008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002080548060200260200160405190810160405280929190818152602001828054801561258257602002820191906000526020600020905b81548152602001906001019080831161256e575b50505050509050919050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630bd756bd6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156125f9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061261d91906148cc565b73ffffffffffffffffffffffffffffffffffffffff16637582b19e336040518263ffffffff1660e01b815260040161265591906148f9565b60006040518083038186803b15801561266d57600080fd5b505afa158015612681573d6000803e3d6000fd5b5050505060025481116126c0576040517fc9b4d6ba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8060038190555050565b6040518060400160405280600581526020017f352e302e3000000000000000000000000000000000000000000000000000000081525081565b600061270d613b7b565b905060008160000160089054906101000a900460ff1615905060008260000160009054906101000a900467ffffffffffffffff1690506000808267ffffffffffffffff1614801561275b5750825b9050600060018367ffffffffffffffff16148015612790575060003073ffffffffffffffffffffffffffffffffffffffff163b145b90508115801561279e575080155b156127d5576040517ff92ee8a900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60018560000160006101000a81548167ffffffffffffffff021916908367ffffffffffffffff16021790555083156128255760018560000160086101000a81548160ff0219169083151502179055505b600073ffffffffffffffffffffffffffffffffffffffff168b73ffffffffffffffffffffffffffffffffffffffff1603612894576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161288b906152a9565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168a73ffffffffffffffffffffffffffffffffffffffff1603612903576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016128fa90615315565b60405180910390fd5b60328760ff161115612941576040517f7064607800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000890361297b576040517f9de3d44100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8789106129b4576040517fc9b4d6ba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8a6000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555089600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550886002819055508760038190555086600460006101000a81548160ff021916908360ff16021790555085600460016101000a81548160ff021916908360ff1602179055506000600581905550612a89613b8f565b8315612ae55760008560000160086101000a81548160ff0219169083151502179055507fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d26001604051612adc9190615384565b60405180910390a15b5050505050505050505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630bd756bd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015612b5d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612b8191906148cc565b73ffffffffffffffffffffffffffffffffffffffff1663f6e31f8f336040518263ffffffff1660e01b8152600401612bb991906148f9565b60006040518083038186803b158015612bd157600080fd5b505afa158015612be5573d6000803e3d6000fd5b5050505060008111612c2c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612c23906153eb565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614612d585760008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636940b5f06040518163ffffffff1660e01b8152600401602060405180830381865afa158015612ccb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612cef9190614b1f565b73ffffffffffffffffffffffffffffffffffffffff1663554b9a0f836040518263ffffffff1660e01b8152600401612d2791906148f9565b60006040518083038186803b158015612d3f57600080fd5b505afa158015612d53573d6000803e3d6000fd5b505050505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603612e6257804711612dc5576040517f786e0a9900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b612e5d60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166361d027b36040518163ffffffff1660e01b8152600401602060405180830381865afa158015612e33573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612e579190615420565b82613a32565b612fd4565b6000829050818173ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401612ea191906148f9565b602060405180830381865afa158015612ebe573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612ee291906151f9565b11612f19576040517f786e0a9900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b612fd260008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166361d027b36040518163ffffffff1660e01b8152600401602060405180830381865afa158015612f87573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612fab9190615420565b838373ffffffffffffffffffffffffffffffffffffffff16613afc9092919063ffffffff16565b505b5050565b600080600660008481526020019081526020016000209050600081600001540361302e576040517fb19089b800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8060070154915050919050565b60035481565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146130c8576040517f6bbaa1c100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000600660008381526020019081526020016000209050600081600001540361311d576040517fb19089b800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000600281111561313157613130614ce7565b5b8160090160009054906101000a900460ff16600281111561315557613154614ce7565b5b1461318c576040517fd781e59600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60005b816003018054905081101561330e5760008260030182815481106131b6576131b5614f94565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060008360080160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050600073ffffffffffffffffffffffffffffffffffffffff168460090160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16036132af576132aa818373ffffffffffffffffffffffffffffffffffffffff16613a3290919063ffffffff16565b6132ff565b6132fe82828660090160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16613afc9092919063ffffffff16565b5b5050808060010191505061318f565b5060005b6008805490508110156133d057826008828154811061333457613333614f94565b5b9060005260206000200154036133c357600860016008805490506133589190614fc3565b8154811061336957613368614f94565b5b90600052602060002001546008828154811061338857613387614f94565b5b906000526020600020018190555060088054806133a8576133a7614ff7565b5b600190038181906000526020600020016000905590556133d0565b8080600101915050613312565b5060028160090160006101000a81548160ff021916908360028111156133f9576133f8614ce7565b5b02179055505050565b600460009054906101000a900460ff1681565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630bd756bd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015613480573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906134a491906148cc565b73ffffffffffffffffffffffffffffffffffffffff16637582b19e336040518263ffffffff1660e01b81526004016134dc91906148f9565b60006040518083038186803b1580156134f457600080fd5b505afa158015613508573d6000803e3d6000fd5b5050505060008160ff1611613552576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401613549906154bf565b60405180910390fd5b80600460016101000a81548160ff021916908360ff16021790555050565b600460019054906101000a900460ff1681565b60008060066000858152602001908152602001600020905060008160000154036135d9576040517fb19089b800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8060080160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205491505092915050565b60025481565b6136a6848573ffffffffffffffffffffffffffffffffffffffff166323b872dd86868660405160240161365f939291906154df565b604051602081830303815290604052915060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050613b99565b50505050565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff16148061375957507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16613740613c3b565b73ffffffffffffffffffffffffffffffffffffffff1614155b15613790576040517fe07c8dba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630bd756bd6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156137fd573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061382191906148cc565b73ffffffffffffffffffffffffffffffffffffffff16637582b19e336040518263ffffffff1660e01b815260040161385991906148f9565b60006040518083038186803b15801561387157600080fd5b505afa158015613885573d6000803e3d6000fd5b5050505050565b8173ffffffffffffffffffffffffffffffffffffffff166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa9250505080156138f457506040513d601f19601f820116820180604052508101906138f1919061552b565b60015b61393557816040517f4c9c8ce300000000000000000000000000000000000000000000000000000000815260040161392c91906148f9565b60405180910390fd5b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b811461399c57806040517faa1d49a400000000000000000000000000000000000000000000000000000000815260040161399391906146aa565b60405180910390fd5b6139a68383613c92565b505050565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff1614613a30576040517fe07c8dba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b80471015613a795747816040517fcf479181000000000000000000000000000000000000000000000000000000008152600401613a70929190615558565b60405180910390fd5b6000808373ffffffffffffffffffffffffffffffffffffffff1683604051613aa0906155b2565b60006040518083038185875af1925050503d8060008114613add576040519150601f19603f3d011682016040523d82523d6000602084013e613ae2565b606091505b509150915081613af657613af581613d05565b5b50505050565b613b76838473ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8585604051602401613b2f9291906155c7565b604051602081830303815290604052915060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050613b99565b505050565b600080613b86613d49565b90508091505090565b613b97613d74565b565b600080602060008451602086016000885af180613bbc576040513d6000823e3d81fd5b3d925060005191505060008214613bd7576001811415613bf3565b60008473ffffffffffffffffffffffffffffffffffffffff163b145b15613c3557836040517f5274afe7000000000000000000000000000000000000000000000000000000008152600401613c2c91906148f9565b60405180910390fd5b50505050565b6000613c697f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b613db4565b60000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b613c9b82613dbe565b8173ffffffffffffffffffffffffffffffffffffffff167fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b60405160405180910390a2600081511115613cf857613cf28282613e8b565b50613d01565b613d00613f0f565b5b5050565b600081511115613d1757805160208201fd5b6040517fd6bda27500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60007ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a0060001b905090565b613d7c613f4c565b613db2576040517fd7e6bcf800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b6000819050919050565b60008173ffffffffffffffffffffffffffffffffffffffff163b03613e1a57806040517f4c9c8ce3000000000000000000000000000000000000000000000000000000008152600401613e1191906148f9565b60405180910390fd5b80613e477f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b613db4565b60000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60606000808473ffffffffffffffffffffffffffffffffffffffff1684604051613eb5919061562c565b600060405180830381855af49150503d8060008114613ef0576040519150601f19603f3d011682016040523d82523d6000602084013e613ef5565b606091505b5091509150613f05858383613f6c565b9250505092915050565b6000341115613f4a576040517fb398979f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b6000613f56613b7b565b60000160089054906101000a900460ff16905090565b606082613f8157613f7c82613d05565b613ff3565b60008251148015613fa9575060008473ffffffffffffffffffffffffffffffffffffffff163b145b15613feb57836040517f9996b315000000000000000000000000000000000000000000000000000000008152600401613fe291906148f9565b60405180910390fd5b819050613ff4565b5b9392505050565b6000604051905090565b600080fd5b600080fd5b600060ff82169050919050565b6140258161400f565b811461403057600080fd5b50565b6000813590506140428161401c565b92915050565b60006020828403121561405e5761405d614005565b5b600061406c84828501614033565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006140a082614075565b9050919050565b6140b081614095565b81146140bb57600080fd5b50565b6000813590506140cd816140a7565b92915050565b6000819050919050565b6140e6816140d3565b81146140f157600080fd5b50565b600081359050614103816140dd565b92915050565b60008060006060848603121561412257614121614005565b5b6000614130868287016140be565b9350506020614141868287016140f4565b9250506040614152868287016140be565b9150509250925092565b614165816140d3565b82525050565b6000602082019050614180600083018461415c565b92915050565b60006020828403121561419c5761419b614005565b5b60006141aa848285016140be565b91505092915050565b6000806000606084860312156141cc576141cb614005565b5b60006141da868287016140f4565b93505060206141eb868287016140be565b92505060406141fc868287016140be565b9150509250925092565b6000819050919050565b61421981614206565b811461422457600080fd5b50565b60008135905061423681614210565b92915050565b6000806040838503121561425357614252614005565b5b6000614261858286016140f4565b925050602061427285828601614227565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6142b1816140d3565b82525050565b60006142c383836142a8565b60208301905092915050565b6000602082019050919050565b60006142e78261427c565b6142f18185614287565b93506142fc83614298565b8060005b8381101561432d57815161431488826142b7565b975061431f836142cf565b925050600181019050614300565b5085935050505092915050565b6000602082019050818103600083015261435481846142dc565b905092915050565b60006020828403121561437257614371614005565b5b6000614380848285016140f4565b91505092915050565b61439281614095565b82525050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6143cd81614095565b82525050565b60006143df83836143c4565b60208301905092915050565b6000602082019050919050565b600061440382614398565b61440d81856143a3565b9350614418836143b4565b8060005b8381101561444957815161443088826143d3565b975061443b836143eb565b92505060018101905061441c565b5085935050505092915050565b61445f8161400f565b82525050565b60006101208201905061447b600083018c61415c565b614488602083018b61415c565b614495604083018a614389565b81810360608301526144a781896143f8565b90506144b6608083018861415c565b6144c360a083018761415c565b6144d060c083018661415c565b6144dd60e0830185614456565b6144eb610100830184614389565b9a9950505050505050505050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61454c82614503565b810181811067ffffffffffffffff8211171561456b5761456a614514565b5b80604052505050565b600061457e613ffb565b905061458a8282614543565b919050565b600067ffffffffffffffff8211156145aa576145a9614514565b5b6145b382614503565b9050602081019050919050565b82818337600083830152505050565b60006145e26145dd8461458f565b614574565b9050828152602081018484840111156145fe576145fd6144fe565b5b6146098482856145c0565b509392505050565b600082601f830112614626576146256144f9565b5b81356146368482602086016145cf565b91505092915050565b6000806040838503121561465657614655614005565b5b6000614664858286016140be565b925050602083013567ffffffffffffffff8111156146855761468461400a565b5b61469185828601614611565b9150509250929050565b6146a481614206565b82525050565b60006020820190506146bf600083018461469b565b92915050565b600080604083850312156146dc576146db614005565b5b60006146ea858286016140f4565b92505060206146fb858286016140be565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561473f578082015181840152602081019050614724565b60008484015250505050565b600061475682614705565b6147608185614710565b9350614770818560208601614721565b61477981614503565b840191505092915050565b6000602082019050818103600083015261479e818461474b565b905092915050565b60008060008060008060c087890312156147c3576147c2614005565b5b60006147d189828a016140be565b96505060206147e289828a016140be565b95505060406147f389828a016140f4565b945050606061480489828a016140f4565b935050608061481589828a01614033565b92505060a061482689828a01614033565b9150509295509295509295565b6000806040838503121561484a57614849614005565b5b6000614858858286016140be565b9250506020614869858286016140f4565b9150509250929050565b60006020820190506148886000830184614456565b92915050565b600061489982614095565b9050919050565b6148a98161488e565b81146148b457600080fd5b50565b6000815190506148c6816148a0565b92915050565b6000602082840312156148e2576148e1614005565b5b60006148f0848285016148b7565b91505092915050565b600060208201905061490e6000830184614389565b92915050565b600061491f82614095565b9050919050565b61492f81614914565b811461493a57600080fd5b50565b60008151905061494c81614926565b92915050565b60006020828403121561496857614967614005565b5b60006149768482850161493d565b91505092915050565b60008115159050919050565b6149948161497f565b811461499f57600080fd5b50565b6000815190506149b18161498b565b92915050565b6000602082840312156149cd576149cc614005565b5b60006149db848285016149a2565b91505092915050565b7f47616d6520646f65736e277420657869737420696e2047616d654d616e61676560008201527f7200000000000000000000000000000000000000000000000000000000000000602082015250565b6000614a40602183614710565b9150614a4b826149e4565b604082019050919050565b60006020820190508181036000830152614a6f81614a33565b9050919050565b6000614a8182614095565b9050919050565b614a9181614a76565b8114614a9c57600080fd5b50565b600081519050614aae81614a88565b92915050565b600060208284031215614aca57614ac9614005565b5b6000614ad884828501614a9f565b91505092915050565b6000614aec82614095565b9050919050565b614afc81614ae1565b8114614b0757600080fd5b50565b600081519050614b1981614af3565b92915050565b600060208284031215614b3557614b34614005565b5b6000614b4384828501614b0a565b91505092915050565b7f42657420616d6f756e74206d757374206d61746368206d73672e76616c75652060008201527f666f72206e617469766520746f6b656e00000000000000000000000000000000602082015250565b6000614ba8603083614710565b9150614bb382614b4c565b604082019050919050565b60006020820190508181036000830152614bd781614b9b565b9050919050565b7f43616e6e6f742073656e6420455448207768656e2062657474696e672077697460008201527f6820746f6b656e73000000000000000000000000000000000000000000000000602082015250565b6000614c3a602883614710565b9150614c4582614bde565b604082019050919050565b60006020820190508181036000830152614c6981614c2d565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000614caa826140d3565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203614cdc57614cdb614c70565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b6000819050919050565b6000614d3b614d36614d318461400f565b614d16565b6140d3565b9050919050565b614d4b81614d20565b82525050565b6000606082019050614d66600083018661415c565b614d736020830185614d42565b614d806040830184614389565b949350505050565b6000614d9382614095565b9050919050565b614da381614d88565b8114614dae57600080fd5b50565b600081519050614dc081614d9a565b92915050565b600060208284031215614ddc57614ddb614005565b5b6000614dea84828501614db1565b91505092915050565b6000604082019050614e086000830185614389565b614e156020830184614389565b9392505050565b7f4e6577206261636b656e642077616c6c6574206973207a65726f210000000000600082015250565b6000614e52601b83614710565b9150614e5d82614e1c565b602082019050919050565b60006020820190508181036000830152614e8181614e45565b9050919050565b7f546f6b656e206d69736d61746368000000000000000000000000000000000000600082015250565b6000614ebe600e83614710565b9150614ec982614e88565b602082019050919050565b60006020820190508181036000830152614eed81614eb1565b9050919050565b7f42657420616d6f756e74206d757374206d61746368206d617463682062696400600082015250565b6000614f2a601f83614710565b9150614f3582614ef4565b602082019050919050565b60006020820190508181036000830152614f5981614f1d565b9050919050565b6000614f6b826140d3565b9150614f76836140d3565b9250828201905080821115614f8e57614f8d614c70565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6000614fce826140d3565b9150614fd9836140d3565b9250828203905081811115614ff157614ff0614c70565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fd5b600081549050919050565b60008190508160005260206000209050919050565b60008160001c9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061508661508183615046565b615053565b9050919050565b60006150998254615073565b9050919050565b6000600182019050919050565b60006150b882615026565b6150c281856143a3565b93506150cd83615031565b8060005b83811015615105576150e28261508d565b6150ec88826143d3565b97506150f7836150a0565b9250506001810190506150d1565b5085935050505092915050565b6000604082019050818103600083015261512c81856150ad565b905061513b602083018461469b565b9392505050565b600061514d826140d3565b9150615158836140d3565b9250828202615166816140d3565b9150828204841483151761517d5761517c614c70565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60006151be826140d3565b91506151c9836140d3565b9250826151d9576151d8615184565b5b828204905092915050565b6000815190506151f3816140dd565b92915050565b60006020828403121561520f5761520e614005565b5b600061521d848285016151e4565b91505092915050565b600060608201905061523b6000830186614389565b615248602083018561415c565b6152556040830184614389565b949350505050565b7f5f61646472657373426f6f6b206973207a65726f210000000000000000000000600082015250565b6000615293601583614710565b915061529e8261525d565b602082019050919050565b600060208201905081810360008301526152c281615286565b9050919050565b7f5f6261636b656e6457616c6c6574206973207a65726f21000000000000000000600082015250565b60006152ff601783614710565b915061530a826152c9565b602082019050919050565b6000602082019050818103600083015261532e816152f2565b9050919050565b6000819050919050565b600067ffffffffffffffff82169050919050565b600061536e61536961536484615335565b614d16565b61533f565b9050919050565b61537e81615353565b82525050565b60006020820190506153996000830184615375565b92915050565b7f5f616d6f756e74206973207a65726f2100000000000000000000000000000000600082015250565b60006153d5601083614710565b91506153e08261539f565b602082019050919050565b60006020820190508181036000830152615404816153c8565b9050919050565b60008151905061541a816140a7565b92915050565b60006020828403121561543657615435614005565b5b60006154448482850161540b565b91505092915050565b7f43656c6c20636f756e74206d7573742062652067726561746572207468616e2060008201527f3000000000000000000000000000000000000000000000000000000000000000602082015250565b60006154a9602183614710565b91506154b48261544d565b604082019050919050565b600060208201905081810360008301526154d88161549c565b9050919050565b60006060820190506154f46000830186614389565b6155016020830185614389565b61550e604083018461415c565b949350505050565b60008151905061552581614210565b92915050565b60006020828403121561554157615540614005565b5b600061554f84828501615516565b91505092915050565b600060408201905061556d600083018561415c565b61557a602083018461415c565b9392505050565b600081905092915050565b50565b600061559c600083615581565b91506155a78261558c565b600082019050919050565b60006155bd8261558f565b9150819050919050565b60006040820190506155dc6000830185614389565b6155e9602083018461415c565b9392505050565b600081519050919050565b6000615606826155f0565b6156108185615581565b9350615620818560208601614721565b80840191505092915050565b600061563882846155fb565b91508190509291505056fea264697066735822122002c99c2621151d334ad2883dddaf5e3f6777ad9545cc0b8adf408ffa00e9c42064736f6c634300081c0033",
  "linkReferences": {},
  "deployedLinkReferences": {}
}]