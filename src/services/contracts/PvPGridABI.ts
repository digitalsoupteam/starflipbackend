export const PvPGridArtifact = [{
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
      "name": "NoPending",
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
      "name": "PendingExists",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "PendingMismatch",
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
      "inputs": [],
      "name": "ZeroAddress",
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
        }
      ],
      "name": "MatchCancelled",
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
          "name": "player1",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "player2",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "token",
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
          "internalType": "bytes32",
          "name": "boardHash",
          "type": "bytes32"
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
          "internalType": "address",
          "name": "player",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "referrer",
          "type": "address"
        }
      ],
      "name": "MatchRequested",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "player",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "PendingCancelled",
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
      "inputs": [],
      "name": "cancelFindMatch",
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
        }
      ],
      "name": "cancelMatch",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "players",
          "type": "address[]"
        },
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "boardHash",
          "type": "bytes32"
        }
      ],
      "name": "createMatch",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "matchId",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
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
      "name": "findMatch",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
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
      "name": "getMatchInfo",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "address[2]",
          "name": "players",
          "type": "address[2]"
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
          "internalType": "uint8",
          "name": "status",
          "type": "uint8"
        },
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "boardHash",
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
        }
      ],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
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
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "pending",
      "outputs": [
        {
          "internalType": "bool",
          "name": "exists",
          "type": "bool"
        },
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "referrer",
          "type": "address"
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
  "bytecode": "0x60a06040523073ffffffffffffffffffffffffffffffffffffffff1660809073ffffffffffffffffffffffffffffffffffffffff1681525034801561004357600080fd5b5061005261005760201b60201c565b6101de565b600061006761015b60201b60201c565b90508060000160089054906101000a900460ff16156100b2576040517ff92ee8a900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b67ffffffffffffffff80168160000160009054906101000a900467ffffffffffffffff1667ffffffffffffffff16146101585767ffffffffffffffff8160000160006101000a81548167ffffffffffffffff021916908367ffffffffffffffff1602179055507fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d267ffffffffffffffff60405161014f91906101c3565b60405180910390a15b50565b60008061016c61017560201b60201c565b90508091505090565b60007ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a0060001b905090565b600067ffffffffffffffff82169050919050565b6101bd816101a0565b82525050565b60006020820190506101d860008301846101b4565b92915050565b608051615802610207600039600081816138d4015281816139290152613bd301526158026000f3fe60806040526004361061012e5760003560e01c8063751947ce116100ab578063bc9685cf1161006f578063bc9685cf146103d8578063cab11d5d14610401578063d02c8cdf1461042c578063d667dcd714610455578063fa968eea14610480578063fa9ffc32146104ab5761012f565b8063751947ce146103075780637c4b35cf146103305780637cfbc7a51461036d578063ad3cb1cc14610396578063b88302bb146103c15761012f565b806352d1902d116100f257806352d1902d1461021f5780635b1987cd1461024a5780635eebea20146102735780636c188593146102b35780636f9fb98a146102dc5761012f565b80630c559757146101315780630edfe7ec1461015a5780632b8d57d7146101835780634b561a16146101c05780634f1ef286146102035761012f565b5b005b34801561013d57600080fd5b50610158600480360381019061015391906143ac565b6104db565b005b34801561016657600080fd5b50610181600480360381019061017c9190614437565b61062e565b005b34801561018f57600080fd5b506101aa60048036038101906101a591906144ff565b6107d8565b6040516101b7919061458c565b60405180910390f35b3480156101cc57600080fd5b506101e760048036038101906101e291906145d3565b6114a1565b6040516101fa97969594939291906146d8565b60405180910390f35b61021d60048036038101906102189190614889565b6115f7565b005b34801561022b57600080fd5b50610234611616565b60405161024191906148e5565b60405180910390f35b34801561025657600080fd5b50610271600480360381019061026c9190614900565b611649565b005b34801561027f57600080fd5b5061029a60048036038101906102959190614437565b611a1c565b6040516102aa9493929190614996565b60405180910390f35b3480156102bf57600080fd5b506102da60048036038101906102d591906145d3565b611a99565b005b3480156102e857600080fd5b506102f1611c0f565b6040516102fe919061458c565b60405180910390f35b34801561031357600080fd5b5061032e600480360381019061032991906149db565b611c17565b005b34801561033c57600080fd5b5061035760048036038101906103529190614437565b6122ca565b6040516103649190614ad9565b60405180910390f35b34801561037957600080fd5b50610394600480360381019061038f91906145d3565b612361565b005b3480156103a257600080fd5b506103ab61249d565b6040516103b89190614b7a565b60405180910390f35b3480156103cd57600080fd5b506103d66124d6565b005b3480156103e457600080fd5b506103ff60048036038101906103fa9190614b9c565b6127ea565b005b34801561040d57600080fd5b50610416612cd0565b604051610423919061458c565b60405180910390f35b34801561043857600080fd5b50610453600480360381019061044e91906145d3565b612cd6565b005b34801561046157600080fd5b5061046a6130bd565b6040516104779190614bdc565b60405180910390f35b34801561048c57600080fd5b506104956130d0565b6040516104a2919061458c565b60405180910390f35b6104c560048036038101906104c09190614bf7565b6130d6565b6040516104d29190614c4a565b60405180910390f35b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630bd756bd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610546573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061056a9190614ca3565b73ffffffffffffffffffffffffffffffffffffffff16637582b19e336040518263ffffffff1660e01b81526004016105a29190614cd0565b60006040518083038186803b1580156105ba57600080fd5b505afa1580156105ce573d6000803e3d6000fd5b5050505060328160ff161115610610576040517f7064607800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b80600460006101000a81548160ff021916908360ff16021790555050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630bd756bd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610699573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106bd9190614ca3565b73ffffffffffffffffffffffffffffffffffffffff16637582b19e336040518263ffffffff1660e01b81526004016106f59190614cd0565b60006040518083038186803b15801561070d57600080fd5b505afa158015610721573d6000803e3d6000fd5b50505050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610794576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161078b90614d37565b60405180910390fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610861576040517f6bbaa1c100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c6b052666040518163ffffffff1660e01b8152600401602060405180830381865afa1580156108cc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108f09190614d95565b73ffffffffffffffffffffffffffffffffffffffff16634d7f334e306040518263ffffffff1660e01b81526004016109289190614cd0565b602060405180830381865afa158015610945573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109699190614dee565b6109a8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161099f90614e8d565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663abd13afe6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610a13573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a379190614eeb565b73ffffffffffffffffffffffffffffffffffffffff16637d6a5f7b6040518163ffffffff1660e01b815260040160006040518083038186803b158015610a7c57600080fd5b505afa158015610a90573d6000803e3d6000fd5b5050505060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636940b5f06040518163ffffffff1660e01b8152600401602060405180830381865afa158015610aff573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b239190614f56565b73ffffffffffffffffffffffffffffffffffffffff1663554b9a0f846040518263ffffffff1660e01b8152600401610b5b9190614cd0565b60006040518083038186803b158015610b7357600080fd5b505afa158015610b87573d6000803e3d6000fd5b5050505060028585905014610bd1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bc890614fcf565b60405180910390fd5b600085856000818110610be757610be6614fef565b5b9050602002016020810190610bfc9190614437565b9050600086866001818110610c1457610c13614fef565b5b9050602002016020810190610c299190614437565b9050600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161480610c925750600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16145b15610cc9576040517fd92e233d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610d37576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d2e9061506a565b60405180910390fd5b6000600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206040518060800160405290816000820160009054906101000a900460ff161515151581526020016000820160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600182015481526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152505090506000600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206040518060800160405290816000820160009054906101000a900460ff161515151581526020016000820160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600182015481526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681525050905081600001511580610f8857508060000151155b15610fbf576040517fda7557bc00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8673ffffffffffffffffffffffffffffffffffffffff16826020015173ffffffffffffffffffffffffffffffffffffffff1614158061102e57508673ffffffffffffffffffffffffffffffffffffffff16816020015173ffffffffffffffffffffffffffffffffffffffff1614155b15611065576040517f3d87e06500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b80604001518260400151146110a6576040517f3d87e06500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600080820160006101000a81549060ff02191690556000820160016101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560018201600090556002820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555050600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600080820160006101000a81549060ff02191690556000820160016101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560018201600090556002820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055505060056000815480929190611211906150b9565b91905055506005549450600060076000878152602001908152602001600020905085816000018190555060405180604001604052808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815250816001019060026112ba9291906142a3565b5082604001518160030181905550600283604001516112d99190615101565b816004018190555086816006018190555060018160070160006101000a81548160ff0219169083600381111561131257611311615143565b5b0217905550878160070160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600860008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020869080600181540180825580915050600190039060005260206000200160009091909190915055600860008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208690806001815401808255809150506001900390600052602060002001600090919091909150558373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16877fb156957ab2fd6a73b7a1d2aeeafbdde846453def049cab6fd3388bad2084e9d88b85600301548c60405161148c93929190615172565b60405180910390a45050505050949350505050565b60006114ab614320565b600080600080600080600760008a815260200190815260200160002090506000816000015403611507576040517fb19089b800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b806000015481600101826003015483600401548460070160009054906101000a900460ff16600381111561153e5761153d615143565b5b8560070160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff168660060154856002806020026040519081016040528092919082600280156115d6576020028201915b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001906001019080831161158c575b50505050509550975097509750975097509750975050919395979092949650565b6115ff6138d2565b611608826139b8565b6116128282613ab2565b5050565b6000611620613bd1565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b905090565b6000611653613c58565b905060008160000160089054906101000a900460ff1615905060008260000160009054906101000a900467ffffffffffffffff1690506000808267ffffffffffffffff161480156116a15750825b9050600060018367ffffffffffffffff161480156116d6575060003073ffffffffffffffffffffffffffffffffffffffff163b145b9050811580156116e4575080155b1561171b576040517ff92ee8a900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60018560000160006101000a81548167ffffffffffffffff021916908367ffffffffffffffff160217905550831561176b5760018560000160086101000a81548160ff0219169083151502179055505b600073ffffffffffffffffffffffffffffffffffffffff168a73ffffffffffffffffffffffffffffffffffffffff16036117da576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016117d1906151f5565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff1603611849576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161184090615261565b60405180910390fd5b60328660ff161115611887576040517f7064607800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600088036118c1576040517f9de3d44100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8688106118fa576040517fc9b4d6ba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b896000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555088600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550876002819055508660038190555085600460006101000a81548160ff021916908360ff16021790555060006005819055506119b4613c6c565b8315611a105760008560000160086101000a81548160ff0219169083151502179055507fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d26001604051611a0791906152da565b60405180910390a15b50505050505050505050565b60066020528060005260406000206000915090508060000160009054906101000a900460ff16908060000160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905084565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630bd756bd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015611b04573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b289190614ca3565b73ffffffffffffffffffffffffffffffffffffffff16637582b19e336040518263ffffffff1660e01b8152600401611b609190614cd0565b60006040518083038186803b158015611b7857600080fd5b505afa158015611b8c573d6000803e3d6000fd5b5050505060008103611bca576040517f9de3d44100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6003548110611c05576040517fc9b4d6ba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8060028190555050565b600047905090565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611c9e576040517f6bbaa1c100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60006007600084815260200190815260200160002090506000816000015403611cf3576040517fb19089b800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60016003811115611d0757611d06615143565b5b8160070160009054906101000a900460ff166003811115611d2b57611d2a615143565b5b14611d62576040517fd781e59600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b80600101600060028110611d7957611d78614fef565b5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614158015611e3a575080600101600160028110611de857611de7614fef565b5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614155b15611e71576040517f0557c2f000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60006064600460009054906101000a900460ff1660ff168360040154611e979190615101565b611ea19190615324565b90506000818360040154611eb59190615355565b905060028360070160006101000a81548160ff02191690836003811115611edf57611ede615143565b5b0217905550600073ffffffffffffffffffffffffffffffffffffffff168360070160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1603611f6a57611f65818573ffffffffffffffffffffffffffffffffffffffff16613c7690919063ffffffff16565b611fba565b611fb984828560070160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16613d409092919063ffffffff16565b5b8373ffffffffffffffffffffffffffffffffffffffff16857f20de984807640ee588cc1cf8a40b9e35644014057784cd50f435bbb8005b50d983604051612001919061458c565b60405180910390a360008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663cdc423446040518163ffffffff1660e01b8152600401602060405180830381865afa158015612074573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061209891906153c7565b73ffffffffffffffffffffffffffffffffffffffff1663e91a196b846001016000600281106120ca576120c9614fef565b5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1685600301548660070160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518463ffffffff1660e01b8152600401612134939291906153f4565b600060405180830381600087803b15801561214e57600080fd5b505af1158015612162573d6000803e3d6000fd5b5050505060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663cdc423446040518163ffffffff1660e01b8152600401602060405180830381865afa1580156121d1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906121f591906153c7565b73ffffffffffffffffffffffffffffffffffffffff1663e91a196b8460010160016002811061222757612226614fef565b5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1685600301548660070160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518463ffffffff1660e01b8152600401612291939291906153f4565b600060405180830381600087803b1580156122ab57600080fd5b505af11580156122bf573d6000803e3d6000fd5b505050505050505050565b6060600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002080548060200260200160405190810160405280929190818152602001828054801561235557602002820191906000526020600020905b815481526020019060010190808311612341575b50505050509050919050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630bd756bd6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156123cc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906123f09190614ca3565b73ffffffffffffffffffffffffffffffffffffffff16637582b19e336040518263ffffffff1660e01b81526004016124289190614cd0565b60006040518083038186803b15801561244057600080fd5b505afa158015612454573d6000803e3d6000fd5b505050506002548111612493576040517fc9b4d6ba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8060038190555050565b6040518060400160405280600581526020017f352e302e3000000000000000000000000000000000000000000000000000000081525081565b6000600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206040518060800160405290816000820160009054906101000a900460ff161515151581526020016000820160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600182015481526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152505090508060000151612630576040517fda7557bc00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600080820160006101000a81549060ff02191690556000820160016101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560018201600090556002820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555050600073ffffffffffffffffffffffffffffffffffffffff16816020015173ffffffffffffffffffffffffffffffffffffffff16036127465761274181604001513373ffffffffffffffffffffffffffffffffffffffff16613c7690919063ffffffff16565b61277a565b612779338260400151836020015173ffffffffffffffffffffffffffffffffffffffff16613d409092919063ffffffff16565b5b806020015173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fa0de69b73768a9da12f77507bbaf81059bab2088faed72c4d60808ea9dd89f7f83604001516040516127df919061458c565b60405180910390a350565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630bd756bd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015612855573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906128799190614ca3565b73ffffffffffffffffffffffffffffffffffffffff1663f6e31f8f336040518263ffffffff1660e01b81526004016128b19190614cd0565b60006040518083038186803b1580156128c957600080fd5b505afa1580156128dd573d6000803e3d6000fd5b5050505060008111612924576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161291b90615477565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614612a505760008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636940b5f06040518163ffffffff1660e01b8152600401602060405180830381865afa1580156129c3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906129e79190614f56565b73ffffffffffffffffffffffffffffffffffffffff1663554b9a0f836040518263ffffffff1660e01b8152600401612a1f9190614cd0565b60006040518083038186803b158015612a3757600080fd5b505afa158015612a4b573d6000803e3d6000fd5b505050505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603612b5a57804711612abd576040517f786e0a9900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b612b5560008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166361d027b36040518163ffffffff1660e01b8152600401602060405180830381865afa158015612b2b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612b4f91906154ac565b82613c76565b612ccc565b6000829050818173ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401612b999190614cd0565b602060405180830381865afa158015612bb6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612bda91906154ee565b11612c11576040517f786e0a9900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b612cca60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166361d027b36040518163ffffffff1660e01b8152600401602060405180830381865afa158015612c7f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612ca391906154ac565b838373ffffffffffffffffffffffffffffffffffffffff16613d409092919063ffffffff16565b505b5050565b60035481565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614612d5d576040517f6bbaa1c100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60006007600083815260200190815260200160002090506000816000015403612db2576040517fb19089b800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60016003811115612dc657612dc5615143565b5b8160070160009054906101000a900460ff166003811115612dea57612de9615143565b5b14612e21576040517fd781e59600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60038160070160006101000a81548160ff02191690836003811115612e4957612e48615143565b5b0217905550600073ffffffffffffffffffffffffffffffffffffffff168160070160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1603612f7557612f0b816003015482600101600060028110612ec557612ec4614fef565b5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16613c7690919063ffffffff16565b612f70816003015482600101600160028110612f2a57612f29614fef565b5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16613c7690919063ffffffff16565b61308c565b61300081600101600060028110612f8f57612f8e614fef565b5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1682600301548360070160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16613d409092919063ffffffff16565b61308b8160010160016002811061301a57613019614fef565b5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1682600301548360070160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16613d409092919063ffffffff16565b5b817f700135b4fe8746e2d2c85a9baa43c62887740aebfeb3a439f71a083fe5d5675960405160405180910390a25050565b600460009054906101000a900460ff1681565b60025481565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c6b052666040518163ffffffff1660e01b8152600401602060405180830381865afa158015613144573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906131689190614d95565b73ffffffffffffffffffffffffffffffffffffffff16634d7f334e306040518263ffffffff1660e01b81526004016131a09190614cd0565b602060405180830381865afa1580156131bd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906131e19190614dee565b613220576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161321790614e8d565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663abd13afe6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561328b573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906132af9190614eeb565b73ffffffffffffffffffffffffffffffffffffffff16637d6a5f7b6040518163ffffffff1660e01b815260040160006040518083038186803b1580156132f457600080fd5b505afa158015613308573d6000803e3d6000fd5b5050505060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636940b5f06040518163ffffffff1660e01b8152600401602060405180830381865afa158015613377573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061339b9190614f56565b73ffffffffffffffffffffffffffffffffffffffff1663554b9a0f856040518263ffffffff1660e01b81526004016133d39190614cd0565b60006040518083038186803b1580156133eb57600080fd5b505afa1580156133ff573d6000803e3d6000fd5b50505050600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900460ff161561348a576040517f4b1a898d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16036135145734905060008414806134d057503484145b61350f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016135069061558d565b60405180910390fd5b613588565b60003414613557576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161354e9061561f565b60405180910390fd5b8390506135873330838873ffffffffffffffffffffffffffffffffffffffff16613dbf909392919063ffffffff16565b5b600254811080613599575060035481115b156135d0576040517f9de3d44100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60405180608001604052806001151581526020018673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020018473ffffffffffffffffffffffffffffffffffffffff16815250600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506040820151816001015560608201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550905050600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161461384a5760008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663cdc423446040518163ffffffff1660e01b8152600401602060405180830381865afa1580156137b9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906137dd91906153c7565b73ffffffffffffffffffffffffffffffffffffffff16637543e3f033856040518363ffffffff1660e01b815260040161381792919061563f565b600060405180830381600087803b15801561383157600080fd5b505af1158015613845573d6000803e3d6000fd5b505050505b8273ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fe6df0f6032fe7232a3d31921a186e8d77d3a86f750dd0e11c0510154813bddec846040516138be919061458c565b60405180910390a460019150509392505050565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff16148061397f57507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16613966613e41565b73ffffffffffffffffffffffffffffffffffffffff1614155b156139b6576040517fe07c8dba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630bd756bd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015613a23573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613a479190614ca3565b73ffffffffffffffffffffffffffffffffffffffff16637582b19e336040518263ffffffff1660e01b8152600401613a7f9190614cd0565b60006040518083038186803b158015613a9757600080fd5b505afa158015613aab573d6000803e3d6000fd5b5050505050565b8173ffffffffffffffffffffffffffffffffffffffff166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015613b1a57506040513d601f19601f82011682018060405250810190613b17919061567d565b60015b613b5b57816040517f4c9c8ce3000000000000000000000000000000000000000000000000000000008152600401613b529190614cd0565b60405180910390fd5b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b8114613bc257806040517faa1d49a4000000000000000000000000000000000000000000000000000000008152600401613bb991906148e5565b60405180910390fd5b613bcc8383613e98565b505050565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff1614613c56576040517fe07c8dba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b600080613c63613f0b565b90508091505090565b613c74613f36565b565b80471015613cbd5747816040517fcf479181000000000000000000000000000000000000000000000000000000008152600401613cb49291906156aa565b60405180910390fd5b6000808373ffffffffffffffffffffffffffffffffffffffff1683604051613ce490615704565b60006040518083038185875af1925050503d8060008114613d21576040519150601f19603f3d011682016040523d82523d6000602084013e613d26565b606091505b509150915081613d3a57613d3981613f76565b5b50505050565b613dba838473ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8585604051602401613d73929190615719565b604051602081830303815290604052915060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050613fba565b505050565b613e3b848573ffffffffffffffffffffffffffffffffffffffff166323b872dd868686604051602401613df493929190615742565b604051602081830303815290604052915060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050613fba565b50505050565b6000613e6f7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b61405c565b60000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b613ea182614066565b8173ffffffffffffffffffffffffffffffffffffffff167fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b60405160405180910390a2600081511115613efe57613ef88282614133565b50613f07565b613f066141b7565b5b5050565b60007ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a0060001b905090565b613f3e6141f4565b613f74576040517fd7e6bcf800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b600081511115613f8857805160208201fd5b6040517fd6bda27500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600080602060008451602086016000885af180613fdd576040513d6000823e3d81fd5b3d925060005191505060008214613ff8576001811415614014565b60008473ffffffffffffffffffffffffffffffffffffffff163b145b1561405657836040517f5274afe700000000000000000000000000000000000000000000000000000000815260040161404d9190614cd0565b60405180910390fd5b50505050565b6000819050919050565b60008173ffffffffffffffffffffffffffffffffffffffff163b036140c257806040517f4c9c8ce30000000000000000000000000000000000000000000000000000000081526004016140b99190614cd0565b60405180910390fd5b806140ef7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b61405c565b60000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60606000808473ffffffffffffffffffffffffffffffffffffffff168460405161415d91906157b5565b600060405180830381855af49150503d8060008114614198576040519150601f19603f3d011682016040523d82523d6000602084013e61419d565b606091505b50915091506141ad858383614214565b9250505092915050565b60003411156141f2576040517fb398979f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b60006141fe613c58565b60000160089054906101000a900460ff16905090565b6060826142295761422482613f76565b61429b565b60008251148015614251575060008473ffffffffffffffffffffffffffffffffffffffff163b145b1561429357836040517f9996b31500000000000000000000000000000000000000000000000000000000815260040161428a9190614cd0565b60405180910390fd5b81905061429c565b5b9392505050565b826002810192821561430f579160200282015b8281111561430e5782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550916020019190600101906142b6565b5b50905061431c9190614342565b5090565b6040518060400160405280600290602082028036833780820191505090505090565b5b8082111561435b576000816000905550600101614343565b5090565b6000604051905090565b600080fd5b600080fd5b600060ff82169050919050565b61438981614373565b811461439457600080fd5b50565b6000813590506143a681614380565b92915050565b6000602082840312156143c2576143c1614369565b5b60006143d084828501614397565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000614404826143d9565b9050919050565b614414816143f9565b811461441f57600080fd5b50565b6000813590506144318161440b565b92915050565b60006020828403121561444d5761444c614369565b5b600061445b84828501614422565b91505092915050565b600080fd5b600080fd5b600080fd5b60008083601f84011261448957614488614464565b5b8235905067ffffffffffffffff8111156144a6576144a5614469565b5b6020830191508360208202830111156144c2576144c161446e565b5b9250929050565b6000819050919050565b6144dc816144c9565b81146144e757600080fd5b50565b6000813590506144f9816144d3565b92915050565b6000806000806060858703121561451957614518614369565b5b600085013567ffffffffffffffff8111156145375761453661436e565b5b61454387828801614473565b9450945050602061455687828801614422565b9250506040614567878288016144ea565b91505092959194509250565b6000819050919050565b61458681614573565b82525050565b60006020820190506145a1600083018461457d565b92915050565b6145b081614573565b81146145bb57600080fd5b50565b6000813590506145cd816145a7565b92915050565b6000602082840312156145e9576145e8614369565b5b60006145f7848285016145be565b91505092915050565b600060029050919050565b600081905092915050565b6000819050919050565b614629816143f9565b82525050565b600061463b8383614620565b60208301905092915050565b6000602082019050919050565b61465d81614600565b614667818461460b565b925061467282614616565b8060005b838110156146a357815161468a878261462f565b965061469583614647565b925050600181019050614676565b505050505050565b6146b481614373565b82525050565b6146c3816143f9565b82525050565b6146d2816144c9565b82525050565b6000610100820190506146ee600083018a61457d565b6146fb6020830189614654565b614708606083018861457d565b614715608083018761457d565b61472260a08301866146ab565b61472f60c08301856146ba565b61473c60e08301846146c9565b98975050505050505050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6147968261474d565b810181811067ffffffffffffffff821117156147b5576147b461475e565b5b80604052505050565b60006147c861435f565b90506147d4828261478d565b919050565b600067ffffffffffffffff8211156147f4576147f361475e565b5b6147fd8261474d565b9050602081019050919050565b82818337600083830152505050565b600061482c614827846147d9565b6147be565b90508281526020810184848401111561484857614847614748565b5b61485384828561480a565b509392505050565b600082601f8301126148705761486f614464565b5b8135614880848260208601614819565b91505092915050565b600080604083850312156148a05761489f614369565b5b60006148ae85828601614422565b925050602083013567ffffffffffffffff8111156148cf576148ce61436e565b5b6148db8582860161485b565b9150509250929050565b60006020820190506148fa60008301846146c9565b92915050565b600080600080600060a0868803121561491c5761491b614369565b5b600061492a88828901614422565b955050602061493b88828901614422565b945050604061494c888289016145be565b935050606061495d888289016145be565b925050608061496e88828901614397565b9150509295509295909350565b60008115159050919050565b6149908161497b565b82525050565b60006080820190506149ab6000830187614987565b6149b860208301866146ba565b6149c5604083018561457d565b6149d260608301846146ba565b95945050505050565b600080604083850312156149f2576149f1614369565b5b6000614a00858286016145be565b9250506020614a1185828601614422565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b614a5081614573565b82525050565b6000614a628383614a47565b60208301905092915050565b6000602082019050919050565b6000614a8682614a1b565b614a908185614a26565b9350614a9b83614a37565b8060005b83811015614acc578151614ab38882614a56565b9750614abe83614a6e565b925050600181019050614a9f565b5085935050505092915050565b60006020820190508181036000830152614af38184614a7b565b905092915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015614b35578082015181840152602081019050614b1a565b60008484015250505050565b6000614b4c82614afb565b614b568185614b06565b9350614b66818560208601614b17565b614b6f8161474d565b840191505092915050565b60006020820190508181036000830152614b948184614b41565b905092915050565b60008060408385031215614bb357614bb2614369565b5b6000614bc185828601614422565b9250506020614bd2858286016145be565b9150509250929050565b6000602082019050614bf160008301846146ab565b92915050565b600080600060608486031215614c1057614c0f614369565b5b6000614c1e86828701614422565b9350506020614c2f868287016145be565b9250506040614c4086828701614422565b9150509250925092565b6000602082019050614c5f6000830184614987565b92915050565b6000614c70826143f9565b9050919050565b614c8081614c65565b8114614c8b57600080fd5b50565b600081519050614c9d81614c77565b92915050565b600060208284031215614cb957614cb8614369565b5b6000614cc784828501614c8e565b91505092915050565b6000602082019050614ce560008301846146ba565b92915050565b7f4e6577206261636b656e642077616c6c6574206973207a65726f210000000000600082015250565b6000614d21601b83614b06565b9150614d2c82614ceb565b602082019050919050565b60006020820190508181036000830152614d5081614d14565b9050919050565b6000614d62826143f9565b9050919050565b614d7281614d57565b8114614d7d57600080fd5b50565b600081519050614d8f81614d69565b92915050565b600060208284031215614dab57614daa614369565b5b6000614db984828501614d80565b91505092915050565b614dcb8161497b565b8114614dd657600080fd5b50565b600081519050614de881614dc2565b92915050565b600060208284031215614e0457614e03614369565b5b6000614e1284828501614dd9565b91505092915050565b7f47616d6520646f65736e277420657869737420696e2047616d654d616e61676560008201527f7200000000000000000000000000000000000000000000000000000000000000602082015250565b6000614e77602183614b06565b9150614e8282614e1b565b604082019050919050565b60006020820190508181036000830152614ea681614e6a565b9050919050565b6000614eb8826143f9565b9050919050565b614ec881614ead565b8114614ed357600080fd5b50565b600081519050614ee581614ebf565b92915050565b600060208284031215614f0157614f00614369565b5b6000614f0f84828501614ed6565b91505092915050565b6000614f23826143f9565b9050919050565b614f3381614f18565b8114614f3e57600080fd5b50565b600081519050614f5081614f2a565b92915050565b600060208284031215614f6c57614f6b614369565b5b6000614f7a84828501614f41565b91505092915050565b7f706c6179657273206d7573742062652032000000000000000000000000000000600082015250565b6000614fb9601183614b06565b9150614fc482614f83565b602082019050919050565b60006020820190508181036000830152614fe881614fac565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f73616d6520706c61796572000000000000000000000000000000000000000000600082015250565b6000615054600b83614b06565b915061505f8261501e565b602082019050919050565b6000602082019050818103600083015261508381615047565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006150c482614573565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036150f6576150f561508a565b5b600182019050919050565b600061510c82614573565b915061511783614573565b925082820261512581614573565b9150828204841483151761513c5761513b61508a565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600060608201905061518760008301866146ba565b615194602083018561457d565b6151a160408301846146c9565b949350505050565b7f5f61646472657373426f6f6b206973207a65726f210000000000000000000000600082015250565b60006151df601583614b06565b91506151ea826151a9565b602082019050919050565b6000602082019050818103600083015261520e816151d2565b9050919050565b7f5f6261636b656e6457616c6c6574206973207a65726f21000000000000000000600082015250565b600061524b601783614b06565b915061525682615215565b602082019050919050565b6000602082019050818103600083015261527a8161523e565b9050919050565b6000819050919050565b600067ffffffffffffffff82169050919050565b6000819050919050565b60006152c46152bf6152ba84615281565b61529f565b61528b565b9050919050565b6152d4816152a9565b82525050565b60006020820190506152ef60008301846152cb565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061532f82614573565b915061533a83614573565b92508261534a576153496152f5565b5b828204905092915050565b600061536082614573565b915061536b83614573565b92508282039050818111156153835761538261508a565b5b92915050565b6000615394826143f9565b9050919050565b6153a481615389565b81146153af57600080fd5b50565b6000815190506153c18161539b565b92915050565b6000602082840312156153dd576153dc614369565b5b60006153eb848285016153b2565b91505092915050565b600060608201905061540960008301866146ba565b615416602083018561457d565b61542360408301846146ba565b949350505050565b7f5f616d6f756e74206973207a65726f2100000000000000000000000000000000600082015250565b6000615461601083614b06565b915061546c8261542b565b602082019050919050565b6000602082019050818103600083015261549081615454565b9050919050565b6000815190506154a68161440b565b92915050565b6000602082840312156154c2576154c1614369565b5b60006154d084828501615497565b91505092915050565b6000815190506154e8816145a7565b92915050565b60006020828403121561550457615503614369565b5b6000615512848285016154d9565b91505092915050565b7f42657420616d6f756e74206d757374206d61746368206d73672e76616c75652060008201527f666f72206e617469766520746f6b656e00000000000000000000000000000000602082015250565b6000615577603083614b06565b91506155828261551b565b604082019050919050565b600060208201905081810360008301526155a68161556a565b9050919050565b7f43616e6e6f742073656e6420455448207768656e2062657474696e672077697460008201527f6820746f6b656e73000000000000000000000000000000000000000000000000602082015250565b6000615609602883614b06565b9150615614826155ad565b604082019050919050565b60006020820190508181036000830152615638816155fc565b9050919050565b600060408201905061565460008301856146ba565b61566160208301846146ba565b9392505050565b600081519050615677816144d3565b92915050565b60006020828403121561569357615692614369565b5b60006156a184828501615668565b91505092915050565b60006040820190506156bf600083018561457d565b6156cc602083018461457d565b9392505050565b600081905092915050565b50565b60006156ee6000836156d3565b91506156f9826156de565b600082019050919050565b600061570f826156e1565b9150819050919050565b600060408201905061572e60008301856146ba565b61573b602083018461457d565b9392505050565b600060608201905061575760008301866146ba565b61576460208301856146ba565b615771604083018461457d565b949350505050565b600081519050919050565b600061578f82615779565b61579981856156d3565b93506157a9818560208601614b17565b80840191505092915050565b60006157c18284615784565b91508190509291505056fea26469706673582212205fa5b58bae316cedc08cc5cc33a7aaaeb7a7c948709c33276ba027bcf8802ed464736f6c634300081c0033",
  "deployedBytecode": "0x60806040526004361061012e5760003560e01c8063751947ce116100ab578063bc9685cf1161006f578063bc9685cf146103d8578063cab11d5d14610401578063d02c8cdf1461042c578063d667dcd714610455578063fa968eea14610480578063fa9ffc32146104ab5761012f565b8063751947ce146103075780637c4b35cf146103305780637cfbc7a51461036d578063ad3cb1cc14610396578063b88302bb146103c15761012f565b806352d1902d116100f257806352d1902d1461021f5780635b1987cd1461024a5780635eebea20146102735780636c188593146102b35780636f9fb98a146102dc5761012f565b80630c559757146101315780630edfe7ec1461015a5780632b8d57d7146101835780634b561a16146101c05780634f1ef286146102035761012f565b5b005b34801561013d57600080fd5b50610158600480360381019061015391906143ac565b6104db565b005b34801561016657600080fd5b50610181600480360381019061017c9190614437565b61062e565b005b34801561018f57600080fd5b506101aa60048036038101906101a591906144ff565b6107d8565b6040516101b7919061458c565b60405180910390f35b3480156101cc57600080fd5b506101e760048036038101906101e291906145d3565b6114a1565b6040516101fa97969594939291906146d8565b60405180910390f35b61021d60048036038101906102189190614889565b6115f7565b005b34801561022b57600080fd5b50610234611616565b60405161024191906148e5565b60405180910390f35b34801561025657600080fd5b50610271600480360381019061026c9190614900565b611649565b005b34801561027f57600080fd5b5061029a60048036038101906102959190614437565b611a1c565b6040516102aa9493929190614996565b60405180910390f35b3480156102bf57600080fd5b506102da60048036038101906102d591906145d3565b611a99565b005b3480156102e857600080fd5b506102f1611c0f565b6040516102fe919061458c565b60405180910390f35b34801561031357600080fd5b5061032e600480360381019061032991906149db565b611c17565b005b34801561033c57600080fd5b5061035760048036038101906103529190614437565b6122ca565b6040516103649190614ad9565b60405180910390f35b34801561037957600080fd5b50610394600480360381019061038f91906145d3565b612361565b005b3480156103a257600080fd5b506103ab61249d565b6040516103b89190614b7a565b60405180910390f35b3480156103cd57600080fd5b506103d66124d6565b005b3480156103e457600080fd5b506103ff60048036038101906103fa9190614b9c565b6127ea565b005b34801561040d57600080fd5b50610416612cd0565b604051610423919061458c565b60405180910390f35b34801561043857600080fd5b50610453600480360381019061044e91906145d3565b612cd6565b005b34801561046157600080fd5b5061046a6130bd565b6040516104779190614bdc565b60405180910390f35b34801561048c57600080fd5b506104956130d0565b6040516104a2919061458c565b60405180910390f35b6104c560048036038101906104c09190614bf7565b6130d6565b6040516104d29190614c4a565b60405180910390f35b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630bd756bd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610546573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061056a9190614ca3565b73ffffffffffffffffffffffffffffffffffffffff16637582b19e336040518263ffffffff1660e01b81526004016105a29190614cd0565b60006040518083038186803b1580156105ba57600080fd5b505afa1580156105ce573d6000803e3d6000fd5b5050505060328160ff161115610610576040517f7064607800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b80600460006101000a81548160ff021916908360ff16021790555050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630bd756bd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610699573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106bd9190614ca3565b73ffffffffffffffffffffffffffffffffffffffff16637582b19e336040518263ffffffff1660e01b81526004016106f59190614cd0565b60006040518083038186803b15801561070d57600080fd5b505afa158015610721573d6000803e3d6000fd5b50505050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610794576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161078b90614d37565b60405180910390fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610861576040517f6bbaa1c100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c6b052666040518163ffffffff1660e01b8152600401602060405180830381865afa1580156108cc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108f09190614d95565b73ffffffffffffffffffffffffffffffffffffffff16634d7f334e306040518263ffffffff1660e01b81526004016109289190614cd0565b602060405180830381865afa158015610945573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109699190614dee565b6109a8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161099f90614e8d565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663abd13afe6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610a13573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a379190614eeb565b73ffffffffffffffffffffffffffffffffffffffff16637d6a5f7b6040518163ffffffff1660e01b815260040160006040518083038186803b158015610a7c57600080fd5b505afa158015610a90573d6000803e3d6000fd5b5050505060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636940b5f06040518163ffffffff1660e01b8152600401602060405180830381865afa158015610aff573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b239190614f56565b73ffffffffffffffffffffffffffffffffffffffff1663554b9a0f846040518263ffffffff1660e01b8152600401610b5b9190614cd0565b60006040518083038186803b158015610b7357600080fd5b505afa158015610b87573d6000803e3d6000fd5b5050505060028585905014610bd1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bc890614fcf565b60405180910390fd5b600085856000818110610be757610be6614fef565b5b9050602002016020810190610bfc9190614437565b9050600086866001818110610c1457610c13614fef565b5b9050602002016020810190610c299190614437565b9050600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161480610c925750600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16145b15610cc9576040517fd92e233d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610d37576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d2e9061506a565b60405180910390fd5b6000600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206040518060800160405290816000820160009054906101000a900460ff161515151581526020016000820160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600182015481526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152505090506000600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206040518060800160405290816000820160009054906101000a900460ff161515151581526020016000820160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600182015481526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681525050905081600001511580610f8857508060000151155b15610fbf576040517fda7557bc00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8673ffffffffffffffffffffffffffffffffffffffff16826020015173ffffffffffffffffffffffffffffffffffffffff1614158061102e57508673ffffffffffffffffffffffffffffffffffffffff16816020015173ffffffffffffffffffffffffffffffffffffffff1614155b15611065576040517f3d87e06500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b80604001518260400151146110a6576040517f3d87e06500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600080820160006101000a81549060ff02191690556000820160016101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560018201600090556002820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555050600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600080820160006101000a81549060ff02191690556000820160016101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560018201600090556002820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055505060056000815480929190611211906150b9565b91905055506005549450600060076000878152602001908152602001600020905085816000018190555060405180604001604052808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815250816001019060026112ba9291906142a3565b5082604001518160030181905550600283604001516112d99190615101565b816004018190555086816006018190555060018160070160006101000a81548160ff0219169083600381111561131257611311615143565b5b0217905550878160070160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600860008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020869080600181540180825580915050600190039060005260206000200160009091909190915055600860008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208690806001815401808255809150506001900390600052602060002001600090919091909150558373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16877fb156957ab2fd6a73b7a1d2aeeafbdde846453def049cab6fd3388bad2084e9d88b85600301548c60405161148c93929190615172565b60405180910390a45050505050949350505050565b60006114ab614320565b600080600080600080600760008a815260200190815260200160002090506000816000015403611507576040517fb19089b800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b806000015481600101826003015483600401548460070160009054906101000a900460ff16600381111561153e5761153d615143565b5b8560070160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff168660060154856002806020026040519081016040528092919082600280156115d6576020028201915b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001906001019080831161158c575b50505050509550975097509750975097509750975050919395979092949650565b6115ff6138d2565b611608826139b8565b6116128282613ab2565b5050565b6000611620613bd1565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b905090565b6000611653613c58565b905060008160000160089054906101000a900460ff1615905060008260000160009054906101000a900467ffffffffffffffff1690506000808267ffffffffffffffff161480156116a15750825b9050600060018367ffffffffffffffff161480156116d6575060003073ffffffffffffffffffffffffffffffffffffffff163b145b9050811580156116e4575080155b1561171b576040517ff92ee8a900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60018560000160006101000a81548167ffffffffffffffff021916908367ffffffffffffffff160217905550831561176b5760018560000160086101000a81548160ff0219169083151502179055505b600073ffffffffffffffffffffffffffffffffffffffff168a73ffffffffffffffffffffffffffffffffffffffff16036117da576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016117d1906151f5565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff1603611849576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161184090615261565b60405180910390fd5b60328660ff161115611887576040517f7064607800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600088036118c1576040517f9de3d44100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8688106118fa576040517fc9b4d6ba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b896000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555088600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550876002819055508660038190555085600460006101000a81548160ff021916908360ff16021790555060006005819055506119b4613c6c565b8315611a105760008560000160086101000a81548160ff0219169083151502179055507fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d26001604051611a0791906152da565b60405180910390a15b50505050505050505050565b60066020528060005260406000206000915090508060000160009054906101000a900460ff16908060000160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905084565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630bd756bd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015611b04573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b289190614ca3565b73ffffffffffffffffffffffffffffffffffffffff16637582b19e336040518263ffffffff1660e01b8152600401611b609190614cd0565b60006040518083038186803b158015611b7857600080fd5b505afa158015611b8c573d6000803e3d6000fd5b5050505060008103611bca576040517f9de3d44100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6003548110611c05576040517fc9b4d6ba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8060028190555050565b600047905090565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611c9e576040517f6bbaa1c100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60006007600084815260200190815260200160002090506000816000015403611cf3576040517fb19089b800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60016003811115611d0757611d06615143565b5b8160070160009054906101000a900460ff166003811115611d2b57611d2a615143565b5b14611d62576040517fd781e59600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b80600101600060028110611d7957611d78614fef565b5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614158015611e3a575080600101600160028110611de857611de7614fef565b5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614155b15611e71576040517f0557c2f000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60006064600460009054906101000a900460ff1660ff168360040154611e979190615101565b611ea19190615324565b90506000818360040154611eb59190615355565b905060028360070160006101000a81548160ff02191690836003811115611edf57611ede615143565b5b0217905550600073ffffffffffffffffffffffffffffffffffffffff168360070160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1603611f6a57611f65818573ffffffffffffffffffffffffffffffffffffffff16613c7690919063ffffffff16565b611fba565b611fb984828560070160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16613d409092919063ffffffff16565b5b8373ffffffffffffffffffffffffffffffffffffffff16857f20de984807640ee588cc1cf8a40b9e35644014057784cd50f435bbb8005b50d983604051612001919061458c565b60405180910390a360008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663cdc423446040518163ffffffff1660e01b8152600401602060405180830381865afa158015612074573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061209891906153c7565b73ffffffffffffffffffffffffffffffffffffffff1663e91a196b846001016000600281106120ca576120c9614fef565b5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1685600301548660070160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518463ffffffff1660e01b8152600401612134939291906153f4565b600060405180830381600087803b15801561214e57600080fd5b505af1158015612162573d6000803e3d6000fd5b5050505060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663cdc423446040518163ffffffff1660e01b8152600401602060405180830381865afa1580156121d1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906121f591906153c7565b73ffffffffffffffffffffffffffffffffffffffff1663e91a196b8460010160016002811061222757612226614fef565b5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1685600301548660070160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518463ffffffff1660e01b8152600401612291939291906153f4565b600060405180830381600087803b1580156122ab57600080fd5b505af11580156122bf573d6000803e3d6000fd5b505050505050505050565b6060600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002080548060200260200160405190810160405280929190818152602001828054801561235557602002820191906000526020600020905b815481526020019060010190808311612341575b50505050509050919050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630bd756bd6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156123cc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906123f09190614ca3565b73ffffffffffffffffffffffffffffffffffffffff16637582b19e336040518263ffffffff1660e01b81526004016124289190614cd0565b60006040518083038186803b15801561244057600080fd5b505afa158015612454573d6000803e3d6000fd5b505050506002548111612493576040517fc9b4d6ba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8060038190555050565b6040518060400160405280600581526020017f352e302e3000000000000000000000000000000000000000000000000000000081525081565b6000600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206040518060800160405290816000820160009054906101000a900460ff161515151581526020016000820160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600182015481526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152505090508060000151612630576040517fda7557bc00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600080820160006101000a81549060ff02191690556000820160016101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560018201600090556002820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555050600073ffffffffffffffffffffffffffffffffffffffff16816020015173ffffffffffffffffffffffffffffffffffffffff16036127465761274181604001513373ffffffffffffffffffffffffffffffffffffffff16613c7690919063ffffffff16565b61277a565b612779338260400151836020015173ffffffffffffffffffffffffffffffffffffffff16613d409092919063ffffffff16565b5b806020015173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fa0de69b73768a9da12f77507bbaf81059bab2088faed72c4d60808ea9dd89f7f83604001516040516127df919061458c565b60405180910390a350565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630bd756bd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015612855573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906128799190614ca3565b73ffffffffffffffffffffffffffffffffffffffff1663f6e31f8f336040518263ffffffff1660e01b81526004016128b19190614cd0565b60006040518083038186803b1580156128c957600080fd5b505afa1580156128dd573d6000803e3d6000fd5b5050505060008111612924576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161291b90615477565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614612a505760008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636940b5f06040518163ffffffff1660e01b8152600401602060405180830381865afa1580156129c3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906129e79190614f56565b73ffffffffffffffffffffffffffffffffffffffff1663554b9a0f836040518263ffffffff1660e01b8152600401612a1f9190614cd0565b60006040518083038186803b158015612a3757600080fd5b505afa158015612a4b573d6000803e3d6000fd5b505050505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603612b5a57804711612abd576040517f786e0a9900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b612b5560008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166361d027b36040518163ffffffff1660e01b8152600401602060405180830381865afa158015612b2b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612b4f91906154ac565b82613c76565b612ccc565b6000829050818173ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401612b999190614cd0565b602060405180830381865afa158015612bb6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612bda91906154ee565b11612c11576040517f786e0a9900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b612cca60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166361d027b36040518163ffffffff1660e01b8152600401602060405180830381865afa158015612c7f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612ca391906154ac565b838373ffffffffffffffffffffffffffffffffffffffff16613d409092919063ffffffff16565b505b5050565b60035481565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614612d5d576040517f6bbaa1c100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60006007600083815260200190815260200160002090506000816000015403612db2576040517fb19089b800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60016003811115612dc657612dc5615143565b5b8160070160009054906101000a900460ff166003811115612dea57612de9615143565b5b14612e21576040517fd781e59600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60038160070160006101000a81548160ff02191690836003811115612e4957612e48615143565b5b0217905550600073ffffffffffffffffffffffffffffffffffffffff168160070160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1603612f7557612f0b816003015482600101600060028110612ec557612ec4614fef565b5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16613c7690919063ffffffff16565b612f70816003015482600101600160028110612f2a57612f29614fef565b5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16613c7690919063ffffffff16565b61308c565b61300081600101600060028110612f8f57612f8e614fef565b5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1682600301548360070160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16613d409092919063ffffffff16565b61308b8160010160016002811061301a57613019614fef565b5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1682600301548360070160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16613d409092919063ffffffff16565b5b817f700135b4fe8746e2d2c85a9baa43c62887740aebfeb3a439f71a083fe5d5675960405160405180910390a25050565b600460009054906101000a900460ff1681565b60025481565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c6b052666040518163ffffffff1660e01b8152600401602060405180830381865afa158015613144573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906131689190614d95565b73ffffffffffffffffffffffffffffffffffffffff16634d7f334e306040518263ffffffff1660e01b81526004016131a09190614cd0565b602060405180830381865afa1580156131bd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906131e19190614dee565b613220576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161321790614e8d565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663abd13afe6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561328b573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906132af9190614eeb565b73ffffffffffffffffffffffffffffffffffffffff16637d6a5f7b6040518163ffffffff1660e01b815260040160006040518083038186803b1580156132f457600080fd5b505afa158015613308573d6000803e3d6000fd5b5050505060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636940b5f06040518163ffffffff1660e01b8152600401602060405180830381865afa158015613377573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061339b9190614f56565b73ffffffffffffffffffffffffffffffffffffffff1663554b9a0f856040518263ffffffff1660e01b81526004016133d39190614cd0565b60006040518083038186803b1580156133eb57600080fd5b505afa1580156133ff573d6000803e3d6000fd5b50505050600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900460ff161561348a576040517f4b1a898d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16036135145734905060008414806134d057503484145b61350f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016135069061558d565b60405180910390fd5b613588565b60003414613557576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161354e9061561f565b60405180910390fd5b8390506135873330838873ffffffffffffffffffffffffffffffffffffffff16613dbf909392919063ffffffff16565b5b600254811080613599575060035481115b156135d0576040517f9de3d44100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60405180608001604052806001151581526020018673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020018473ffffffffffffffffffffffffffffffffffffffff16815250600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506040820151816001015560608201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550905050600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161461384a5760008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663cdc423446040518163ffffffff1660e01b8152600401602060405180830381865afa1580156137b9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906137dd91906153c7565b73ffffffffffffffffffffffffffffffffffffffff16637543e3f033856040518363ffffffff1660e01b815260040161381792919061563f565b600060405180830381600087803b15801561383157600080fd5b505af1158015613845573d6000803e3d6000fd5b505050505b8273ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fe6df0f6032fe7232a3d31921a186e8d77d3a86f750dd0e11c0510154813bddec846040516138be919061458c565b60405180910390a460019150509392505050565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff16148061397f57507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16613966613e41565b73ffffffffffffffffffffffffffffffffffffffff1614155b156139b6576040517fe07c8dba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630bd756bd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015613a23573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613a479190614ca3565b73ffffffffffffffffffffffffffffffffffffffff16637582b19e336040518263ffffffff1660e01b8152600401613a7f9190614cd0565b60006040518083038186803b158015613a9757600080fd5b505afa158015613aab573d6000803e3d6000fd5b5050505050565b8173ffffffffffffffffffffffffffffffffffffffff166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015613b1a57506040513d601f19601f82011682018060405250810190613b17919061567d565b60015b613b5b57816040517f4c9c8ce3000000000000000000000000000000000000000000000000000000008152600401613b529190614cd0565b60405180910390fd5b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b8114613bc257806040517faa1d49a4000000000000000000000000000000000000000000000000000000008152600401613bb991906148e5565b60405180910390fd5b613bcc8383613e98565b505050565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff1614613c56576040517fe07c8dba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b600080613c63613f0b565b90508091505090565b613c74613f36565b565b80471015613cbd5747816040517fcf479181000000000000000000000000000000000000000000000000000000008152600401613cb49291906156aa565b60405180910390fd5b6000808373ffffffffffffffffffffffffffffffffffffffff1683604051613ce490615704565b60006040518083038185875af1925050503d8060008114613d21576040519150601f19603f3d011682016040523d82523d6000602084013e613d26565b606091505b509150915081613d3a57613d3981613f76565b5b50505050565b613dba838473ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8585604051602401613d73929190615719565b604051602081830303815290604052915060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050613fba565b505050565b613e3b848573ffffffffffffffffffffffffffffffffffffffff166323b872dd868686604051602401613df493929190615742565b604051602081830303815290604052915060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050613fba565b50505050565b6000613e6f7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b61405c565b60000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b613ea182614066565b8173ffffffffffffffffffffffffffffffffffffffff167fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b60405160405180910390a2600081511115613efe57613ef88282614133565b50613f07565b613f066141b7565b5b5050565b60007ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a0060001b905090565b613f3e6141f4565b613f74576040517fd7e6bcf800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b600081511115613f8857805160208201fd5b6040517fd6bda27500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600080602060008451602086016000885af180613fdd576040513d6000823e3d81fd5b3d925060005191505060008214613ff8576001811415614014565b60008473ffffffffffffffffffffffffffffffffffffffff163b145b1561405657836040517f5274afe700000000000000000000000000000000000000000000000000000000815260040161404d9190614cd0565b60405180910390fd5b50505050565b6000819050919050565b60008173ffffffffffffffffffffffffffffffffffffffff163b036140c257806040517f4c9c8ce30000000000000000000000000000000000000000000000000000000081526004016140b99190614cd0565b60405180910390fd5b806140ef7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b61405c565b60000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60606000808473ffffffffffffffffffffffffffffffffffffffff168460405161415d91906157b5565b600060405180830381855af49150503d8060008114614198576040519150601f19603f3d011682016040523d82523d6000602084013e61419d565b606091505b50915091506141ad858383614214565b9250505092915050565b60003411156141f2576040517fb398979f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b60006141fe613c58565b60000160089054906101000a900460ff16905090565b6060826142295761422482613f76565b61429b565b60008251148015614251575060008473ffffffffffffffffffffffffffffffffffffffff163b145b1561429357836040517f9996b31500000000000000000000000000000000000000000000000000000000815260040161428a9190614cd0565b60405180910390fd5b81905061429c565b5b9392505050565b826002810192821561430f579160200282015b8281111561430e5782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550916020019190600101906142b6565b5b50905061431c9190614342565b5090565b6040518060400160405280600290602082028036833780820191505090505090565b5b8082111561435b576000816000905550600101614343565b5090565b6000604051905090565b600080fd5b600080fd5b600060ff82169050919050565b61438981614373565b811461439457600080fd5b50565b6000813590506143a681614380565b92915050565b6000602082840312156143c2576143c1614369565b5b60006143d084828501614397565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000614404826143d9565b9050919050565b614414816143f9565b811461441f57600080fd5b50565b6000813590506144318161440b565b92915050565b60006020828403121561444d5761444c614369565b5b600061445b84828501614422565b91505092915050565b600080fd5b600080fd5b600080fd5b60008083601f84011261448957614488614464565b5b8235905067ffffffffffffffff8111156144a6576144a5614469565b5b6020830191508360208202830111156144c2576144c161446e565b5b9250929050565b6000819050919050565b6144dc816144c9565b81146144e757600080fd5b50565b6000813590506144f9816144d3565b92915050565b6000806000806060858703121561451957614518614369565b5b600085013567ffffffffffffffff8111156145375761453661436e565b5b61454387828801614473565b9450945050602061455687828801614422565b9250506040614567878288016144ea565b91505092959194509250565b6000819050919050565b61458681614573565b82525050565b60006020820190506145a1600083018461457d565b92915050565b6145b081614573565b81146145bb57600080fd5b50565b6000813590506145cd816145a7565b92915050565b6000602082840312156145e9576145e8614369565b5b60006145f7848285016145be565b91505092915050565b600060029050919050565b600081905092915050565b6000819050919050565b614629816143f9565b82525050565b600061463b8383614620565b60208301905092915050565b6000602082019050919050565b61465d81614600565b614667818461460b565b925061467282614616565b8060005b838110156146a357815161468a878261462f565b965061469583614647565b925050600181019050614676565b505050505050565b6146b481614373565b82525050565b6146c3816143f9565b82525050565b6146d2816144c9565b82525050565b6000610100820190506146ee600083018a61457d565b6146fb6020830189614654565b614708606083018861457d565b614715608083018761457d565b61472260a08301866146ab565b61472f60c08301856146ba565b61473c60e08301846146c9565b98975050505050505050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6147968261474d565b810181811067ffffffffffffffff821117156147b5576147b461475e565b5b80604052505050565b60006147c861435f565b90506147d4828261478d565b919050565b600067ffffffffffffffff8211156147f4576147f361475e565b5b6147fd8261474d565b9050602081019050919050565b82818337600083830152505050565b600061482c614827846147d9565b6147be565b90508281526020810184848401111561484857614847614748565b5b61485384828561480a565b509392505050565b600082601f8301126148705761486f614464565b5b8135614880848260208601614819565b91505092915050565b600080604083850312156148a05761489f614369565b5b60006148ae85828601614422565b925050602083013567ffffffffffffffff8111156148cf576148ce61436e565b5b6148db8582860161485b565b9150509250929050565b60006020820190506148fa60008301846146c9565b92915050565b600080600080600060a0868803121561491c5761491b614369565b5b600061492a88828901614422565b955050602061493b88828901614422565b945050604061494c888289016145be565b935050606061495d888289016145be565b925050608061496e88828901614397565b9150509295509295909350565b60008115159050919050565b6149908161497b565b82525050565b60006080820190506149ab6000830187614987565b6149b860208301866146ba565b6149c5604083018561457d565b6149d260608301846146ba565b95945050505050565b600080604083850312156149f2576149f1614369565b5b6000614a00858286016145be565b9250506020614a1185828601614422565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b614a5081614573565b82525050565b6000614a628383614a47565b60208301905092915050565b6000602082019050919050565b6000614a8682614a1b565b614a908185614a26565b9350614a9b83614a37565b8060005b83811015614acc578151614ab38882614a56565b9750614abe83614a6e565b925050600181019050614a9f565b5085935050505092915050565b60006020820190508181036000830152614af38184614a7b565b905092915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015614b35578082015181840152602081019050614b1a565b60008484015250505050565b6000614b4c82614afb565b614b568185614b06565b9350614b66818560208601614b17565b614b6f8161474d565b840191505092915050565b60006020820190508181036000830152614b948184614b41565b905092915050565b60008060408385031215614bb357614bb2614369565b5b6000614bc185828601614422565b9250506020614bd2858286016145be565b9150509250929050565b6000602082019050614bf160008301846146ab565b92915050565b600080600060608486031215614c1057614c0f614369565b5b6000614c1e86828701614422565b9350506020614c2f868287016145be565b9250506040614c4086828701614422565b9150509250925092565b6000602082019050614c5f6000830184614987565b92915050565b6000614c70826143f9565b9050919050565b614c8081614c65565b8114614c8b57600080fd5b50565b600081519050614c9d81614c77565b92915050565b600060208284031215614cb957614cb8614369565b5b6000614cc784828501614c8e565b91505092915050565b6000602082019050614ce560008301846146ba565b92915050565b7f4e6577206261636b656e642077616c6c6574206973207a65726f210000000000600082015250565b6000614d21601b83614b06565b9150614d2c82614ceb565b602082019050919050565b60006020820190508181036000830152614d5081614d14565b9050919050565b6000614d62826143f9565b9050919050565b614d7281614d57565b8114614d7d57600080fd5b50565b600081519050614d8f81614d69565b92915050565b600060208284031215614dab57614daa614369565b5b6000614db984828501614d80565b91505092915050565b614dcb8161497b565b8114614dd657600080fd5b50565b600081519050614de881614dc2565b92915050565b600060208284031215614e0457614e03614369565b5b6000614e1284828501614dd9565b91505092915050565b7f47616d6520646f65736e277420657869737420696e2047616d654d616e61676560008201527f7200000000000000000000000000000000000000000000000000000000000000602082015250565b6000614e77602183614b06565b9150614e8282614e1b565b604082019050919050565b60006020820190508181036000830152614ea681614e6a565b9050919050565b6000614eb8826143f9565b9050919050565b614ec881614ead565b8114614ed357600080fd5b50565b600081519050614ee581614ebf565b92915050565b600060208284031215614f0157614f00614369565b5b6000614f0f84828501614ed6565b91505092915050565b6000614f23826143f9565b9050919050565b614f3381614f18565b8114614f3e57600080fd5b50565b600081519050614f5081614f2a565b92915050565b600060208284031215614f6c57614f6b614369565b5b6000614f7a84828501614f41565b91505092915050565b7f706c6179657273206d7573742062652032000000000000000000000000000000600082015250565b6000614fb9601183614b06565b9150614fc482614f83565b602082019050919050565b60006020820190508181036000830152614fe881614fac565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f73616d6520706c61796572000000000000000000000000000000000000000000600082015250565b6000615054600b83614b06565b915061505f8261501e565b602082019050919050565b6000602082019050818103600083015261508381615047565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006150c482614573565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036150f6576150f561508a565b5b600182019050919050565b600061510c82614573565b915061511783614573565b925082820261512581614573565b9150828204841483151761513c5761513b61508a565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600060608201905061518760008301866146ba565b615194602083018561457d565b6151a160408301846146c9565b949350505050565b7f5f61646472657373426f6f6b206973207a65726f210000000000000000000000600082015250565b60006151df601583614b06565b91506151ea826151a9565b602082019050919050565b6000602082019050818103600083015261520e816151d2565b9050919050565b7f5f6261636b656e6457616c6c6574206973207a65726f21000000000000000000600082015250565b600061524b601783614b06565b915061525682615215565b602082019050919050565b6000602082019050818103600083015261527a8161523e565b9050919050565b6000819050919050565b600067ffffffffffffffff82169050919050565b6000819050919050565b60006152c46152bf6152ba84615281565b61529f565b61528b565b9050919050565b6152d4816152a9565b82525050565b60006020820190506152ef60008301846152cb565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061532f82614573565b915061533a83614573565b92508261534a576153496152f5565b5b828204905092915050565b600061536082614573565b915061536b83614573565b92508282039050818111156153835761538261508a565b5b92915050565b6000615394826143f9565b9050919050565b6153a481615389565b81146153af57600080fd5b50565b6000815190506153c18161539b565b92915050565b6000602082840312156153dd576153dc614369565b5b60006153eb848285016153b2565b91505092915050565b600060608201905061540960008301866146ba565b615416602083018561457d565b61542360408301846146ba565b949350505050565b7f5f616d6f756e74206973207a65726f2100000000000000000000000000000000600082015250565b6000615461601083614b06565b915061546c8261542b565b602082019050919050565b6000602082019050818103600083015261549081615454565b9050919050565b6000815190506154a68161440b565b92915050565b6000602082840312156154c2576154c1614369565b5b60006154d084828501615497565b91505092915050565b6000815190506154e8816145a7565b92915050565b60006020828403121561550457615503614369565b5b6000615512848285016154d9565b91505092915050565b7f42657420616d6f756e74206d757374206d61746368206d73672e76616c75652060008201527f666f72206e617469766520746f6b656e00000000000000000000000000000000602082015250565b6000615577603083614b06565b91506155828261551b565b604082019050919050565b600060208201905081810360008301526155a68161556a565b9050919050565b7f43616e6e6f742073656e6420455448207768656e2062657474696e672077697460008201527f6820746f6b656e73000000000000000000000000000000000000000000000000602082015250565b6000615609602883614b06565b9150615614826155ad565b604082019050919050565b60006020820190508181036000830152615638816155fc565b9050919050565b600060408201905061565460008301856146ba565b61566160208301846146ba565b9392505050565b600081519050615677816144d3565b92915050565b60006020828403121561569357615692614369565b5b60006156a184828501615668565b91505092915050565b60006040820190506156bf600083018561457d565b6156cc602083018461457d565b9392505050565b600081905092915050565b50565b60006156ee6000836156d3565b91506156f9826156de565b600082019050919050565b600061570f826156e1565b9150819050919050565b600060408201905061572e60008301856146ba565b61573b602083018461457d565b9392505050565b600060608201905061575760008301866146ba565b61576460208301856146ba565b615771604083018461457d565b949350505050565b600081519050919050565b600061578f82615779565b61579981856156d3565b93506157a9818560208601614b17565b80840191505092915050565b60006157c18284615784565b91508190509291505056fea26469706673582212205fa5b58bae316cedc08cc5cc33a7aaaeb7a7c948709c33276ba027bcf8802ed464736f6c634300081c0033",
  "linkReferences": {},
  "deployedLinkReferences": {}
}]