export const PvPGridArtifact = [
  {
    _format: "hh-sol-artifact-1",
    contractName: "PvPGrid",
    sourceName: "contracts/games/PvPGrid.sol",
    abi: [
      {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
        ],
        name: "AddressEmptyCode",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "implementation",
            type: "address",
          },
        ],
        name: "ERC1967InvalidImplementation",
        type: "error",
      },
      {
        inputs: [],
        name: "ERC1967NonPayable",
        type: "error",
      },
      {
        inputs: [],
        name: "FailedCall",
        type: "error",
      },
      {
        inputs: [],
        name: "HouseEdgeExceeded",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "balance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "needed",
            type: "uint256",
          },
        ],
        name: "InsufficientBalance",
        type: "error",
      },
      {
        inputs: [],
        name: "InsufficientContractBalance",
        type: "error",
      },
      {
        inputs: [],
        name: "InvalidBetAmount",
        type: "error",
      },
      {
        inputs: [],
        name: "InvalidHouseEdge",
        type: "error",
      },
      {
        inputs: [],
        name: "InvalidInitialization",
        type: "error",
      },
      {
        inputs: [],
        name: "InvalidMatchStatus",
        type: "error",
      },
      {
        inputs: [],
        name: "InvalidPayouts",
        type: "error",
      },
      {
        inputs: [],
        name: "MatchNotFound",
        type: "error",
      },
      {
        inputs: [],
        name: "MinGreaterThanMax",
        type: "error",
      },
      {
        inputs: [],
        name: "NoPending",
        type: "error",
      },
      {
        inputs: [],
        name: "NotInitializing",
        type: "error",
      },
      {
        inputs: [],
        name: "OnlyBackend",
        type: "error",
      },
      {
        inputs: [],
        name: "PendingExists",
        type: "error",
      },
      {
        inputs: [],
        name: "PendingMismatch",
        type: "error",
      },
      {
        inputs: [],
        name: "PlayerNotInMatch",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
        ],
        name: "SafeERC20FailedOperation",
        type: "error",
      },
      {
        inputs: [],
        name: "UUPSUnauthorizedCallContext",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "slot",
            type: "bytes32",
          },
        ],
        name: "UUPSUnsupportedProxiableUUID",
        type: "error",
      },
      {
        inputs: [],
        name: "ZeroAddress",
        type: "error",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint64",
            name: "version",
            type: "uint64",
          },
        ],
        name: "Initialized",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "uint256",
            name: "matchId",
            type: "uint256",
          },
        ],
        name: "MatchCancelled",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "uint256",
            name: "matchId",
            type: "uint256",
          },
          {
            indexed: true,
            internalType: "address",
            name: "player1",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "player2",
            type: "address",
          },
          {
            indexed: false,
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "bid",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "bytes32",
            name: "boardHash",
            type: "bytes32",
          },
        ],
        name: "MatchCreated",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "uint256",
            name: "matchId",
            type: "uint256",
          },
          {
            indexed: true,
            internalType: "address",
            name: "player1",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "payout1",
            type: "uint256",
          },
          {
            indexed: true,
            internalType: "address",
            name: "player2",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "payout2",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "houseAmount",
            type: "uint256",
          },
        ],
        name: "MatchFinished",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "player",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            indexed: true,
            internalType: "address",
            name: "referrer",
            type: "address",
          },
        ],
        name: "MatchRequested",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "player",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "PendingCancelled",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "implementation",
            type: "address",
          },
        ],
        name: "Upgraded",
        type: "event",
      },
      {
        stateMutability: "payable",
        type: "fallback",
      },
      {
        inputs: [],
        name: "UPGRADE_INTERFACE_VERSION",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "cancelFindMatch",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "matchId",
            type: "uint256",
          },
        ],
        name: "cancelMatch",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "players",
            type: "address[]",
          },
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "boardHash",
            type: "bytes32",
          },
        ],
        name: "createMatch",
        outputs: [
          {
            internalType: "uint256",
            name: "matchId",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "betAmount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "referrer",
            type: "address",
          },
        ],
        name: "findMatch",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "matchId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "payoutP1",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "payoutP2",
            type: "uint256",
          },
        ],
        name: "finishMatch",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "getContractBalance",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "matchId",
            type: "uint256",
          },
        ],
        name: "getMatchInfo",
        outputs: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address[2]",
            name: "players",
            type: "address[2]",
          },
          {
            internalType: "uint256",
            name: "bid",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "total",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "boardHash",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "player",
            type: "address",
          },
        ],
        name: "getPlayerMatches",
        outputs: [
          {
            internalType: "uint256[]",
            name: "",
            type: "uint256[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "houseEdge",
        outputs: [
          {
            internalType: "uint8",
            name: "",
            type: "uint8",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_addressBook",
            type: "address",
          },
          {
            internalType: "address",
            name: "_backendWallet",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_minBetAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_maxBetAmount",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "_houseEdge",
            type: "uint8",
          },
        ],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "maxBetAmount",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "minBetAmount",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "pending",
        outputs: [
          {
            internalType: "bool",
            name: "exists",
            type: "bool",
          },
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "referrer",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "proxiableUUID",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "newBackendWallet",
            type: "address",
          },
        ],
        name: "setBackendWallet",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint8",
            name: "_houseEdge",
            type: "uint8",
          },
        ],
        name: "setHouseEdge",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_maxBetAmount",
            type: "uint256",
          },
        ],
        name: "setMaxBetAmount",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_minBetAmount",
            type: "uint256",
          },
        ],
        name: "setMinBetAmount",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "newImplementation",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        name: "upgradeToAndCall",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_amount",
            type: "uint256",
          },
        ],
        name: "withdrawToTreasury",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        stateMutability: "payable",
        type: "receive",
      },
    ],
    bytecode:
      "0x60a06040523073ffffffffffffffffffffffffffffffffffffffff1660809073ffffffffffffffffffffffffffffffffffffffff1681525034801561004357600080fd5b5061005261005760201b60201c565b6101de565b600061006761015b60201b60201c565b90508060000160089054906101000a900460ff16156100b2576040517ff92ee8a900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b67ffffffffffffffff80168160000160009054906101000a900467ffffffffffffffff1667ffffffffffffffff16146101585767ffffffffffffffff8160000160006101000a81548167ffffffffffffffff021916908367ffffffffffffffff1602179055507fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d267ffffffffffffffff60405161014f91906101c3565b60405180910390a15b50565b60008061016c61017560201b60201c565b90508091505090565b60007ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a0060001b905090565b600067ffffffffffffffff82169050919050565b6101bd816101a0565b82525050565b60006020820190506101d860008301846101b4565b92915050565b6080516158a461020760003960008181613a4101528181613a960152613d4001526158a46000f3fe60806040526004361061012e5760003560e01c80636f9fb98a116100ab578063bc9685cf1161006f578063bc9685cf146103d8578063cab11d5d14610401578063d02c8cdf1461042c578063d667dcd714610455578063fa968eea14610480578063fa9ffc32146104ab5761012f565b80636f9fb98a146103055780637c4b35cf146103305780637cfbc7a51461036d578063ad3cb1cc14610396578063b88302bb146103c15761012f565b80634f1ef286116100f25780634f1ef2861461022c57806352d1902d146102485780635b1987cd146102735780635eebea201461029c5780636c188593146102dc5761012f565b80630c559757146101315780630edfe7ec1461015a5780630fbf1ed5146101835780632b8d57d7146101ac5780634b561a16146101e95761012f565b5b005b34801561013d57600080fd5b50610158600480360381019061015391906143d0565b6104db565b005b34801561016657600080fd5b50610181600480360381019061017c919061445b565b61062e565b005b34801561018f57600080fd5b506101aa60048036038101906101a591906144be565b6107d8565b005b3480156101b857600080fd5b506101d360048036038101906101ce91906145ac565b610eaf565b6040516101e0919061462f565b60405180910390f35b3480156101f557600080fd5b50610210600480360381019061020b919061464a565b611b78565b604051610223979695949392919061474f565b60405180910390f35b61024660048036038101906102419190614900565b611cce565b005b34801561025457600080fd5b5061025d611ced565b60405161026a919061495c565b60405180910390f35b34801561027f57600080fd5b5061029a60048036038101906102959190614977565b611d20565b005b3480156102a857600080fd5b506102c360048036038101906102be919061445b565b6120f3565b6040516102d39493929190614a0d565b60405180910390f35b3480156102e857600080fd5b5061030360048036038101906102fe919061464a565b612170565b005b34801561031157600080fd5b5061031a6122e6565b604051610327919061462f565b60405180910390f35b34801561033c57600080fd5b506103576004803603810190610352919061445b565b6122ee565b6040516103649190614b10565b60405180910390f35b34801561037957600080fd5b50610394600480360381019061038f919061464a565b612385565b005b3480156103a257600080fd5b506103ab6124c1565b6040516103b89190614bb1565b60405180910390f35b3480156103cd57600080fd5b506103d66124fa565b005b3480156103e457600080fd5b506103ff60048036038101906103fa9190614bd3565b61280e565b005b34801561040d57600080fd5b50610416612cf4565b604051610423919061462f565b60405180910390f35b34801561043857600080fd5b50610453600480360381019061044e919061464a565b612cfa565b005b34801561046157600080fd5b5061046a6130e1565b6040516104779190614c13565b60405180910390f35b34801561048c57600080fd5b506104956130f4565b6040516104a2919061462f565b60405180910390f35b6104c560048036038101906104c09190614c2e565b6130fa565b6040516104d29190614c81565b60405180910390f35b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630bd756bd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610546573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061056a9190614cda565b73ffffffffffffffffffffffffffffffffffffffff16637582b19e336040518263ffffffff1660e01b81526004016105a29190614d07565b60006040518083038186803b1580156105ba57600080fd5b505afa1580156105ce573d6000803e3d6000fd5b5050505060328160ff161115610610576040517f7064607800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b80600460006101000a81548160ff021916908360ff16021790555050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630bd756bd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610699573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106bd9190614cda565b73ffffffffffffffffffffffffffffffffffffffff16637582b19e336040518263ffffffff1660e01b81526004016106f59190614d07565b60006040518083038186803b15801561070d57600080fd5b505afa158015610721573d6000803e3d6000fd5b50505050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610794576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161078b90614d6e565b60405180910390fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461085f576040517f6bbaa1c100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600060076000858152602001908152602001600020905060008160000154036108b4576040517fb19089b800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600160038111156108c8576108c7614d8e565b5b8160070160009054906101000a900460ff1660038111156108ec576108eb614d8e565b5b14610923576040517fd781e59600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600082846109319190614dec565b90508160040154811115610971576040517f663493a000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008183600401546109839190614e20565b905060006064600460009054906101000a900460ff1660ff1685600401546109ab9190614e54565b6109b59190614ec5565b9050808211156109f1576040517fc4cb9eb900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60028460070160006101000a81548160ff02191690836003811115610a1957610a18614d8e565b5b0217905550600084600101600060028110610a3757610a36614ef6565b5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600085600101600160028110610a7457610a73614ef6565b5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168660070160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1603610b5b576000881115610b2357610b22888373ffffffffffffffffffffffffffffffffffffffff166138f690919063ffffffff16565b5b6000871115610b5657610b55878273ffffffffffffffffffffffffffffffffffffffff166138f690919063ffffffff16565b5b610bf0565b60008660070160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690506000891115610bb957610bb8838a8373ffffffffffffffffffffffffffffffffffffffff166139c09092919063ffffffff16565b5b6000881115610bee57610bed82898373ffffffffffffffffffffffffffffffffffffffff166139c09092919063ffffffff16565b5b505b8073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff168a7fa2fbaf655fd4712ec7380f71664f0d2fa13dfad5225259bbee82b4d54b4579358b8b89604051610c5293929190614f25565b60405180910390a460008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663cdc423446040518163ffffffff1660e01b8152600401602060405180830381865afa158015610cc5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ce99190614f9a565b73ffffffffffffffffffffffffffffffffffffffff1663e91a196b8388600301548960070160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518463ffffffff1660e01b8152600401610d4d93929190614fc7565b600060405180830381600087803b158015610d6757600080fd5b505af1158015610d7b573d6000803e3d6000fd5b5050505060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663cdc423446040518163ffffffff1660e01b8152600401602060405180830381865afa158015610dea573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e0e9190614f9a565b73ffffffffffffffffffffffffffffffffffffffff1663e91a196b8288600301548960070160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518463ffffffff1660e01b8152600401610e7293929190614fc7565b600060405180830381600087803b158015610e8c57600080fd5b505af1158015610ea0573d6000803e3d6000fd5b50505050505050505050505050565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610f38576040517f6bbaa1c100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c6b052666040518163ffffffff1660e01b8152600401602060405180830381865afa158015610fa3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fc7919061503c565b73ffffffffffffffffffffffffffffffffffffffff16634d7f334e306040518263ffffffff1660e01b8152600401610fff9190614d07565b602060405180830381865afa15801561101c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110409190615095565b61107f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161107690615134565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663abd13afe6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156110ea573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061110e9190615192565b73ffffffffffffffffffffffffffffffffffffffff16637d6a5f7b6040518163ffffffff1660e01b815260040160006040518083038186803b15801561115357600080fd5b505afa158015611167573d6000803e3d6000fd5b5050505060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636940b5f06040518163ffffffff1660e01b8152600401602060405180830381865afa1580156111d6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111fa91906151fd565b73ffffffffffffffffffffffffffffffffffffffff1663554b9a0f846040518263ffffffff1660e01b81526004016112329190614d07565b60006040518083038186803b15801561124a57600080fd5b505afa15801561125e573d6000803e3d6000fd5b50505050600285859050146112a8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161129f90615276565b60405180910390fd5b6000858560008181106112be576112bd614ef6565b5b90506020020160208101906112d3919061445b565b90506000868660018181106112eb576112ea614ef6565b5b9050602002016020810190611300919061445b565b9050600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614806113695750600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16145b156113a0576040517fd92e233d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361140e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611405906152e2565b60405180910390fd5b6000600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206040518060800160405290816000820160009054906101000a900460ff161515151581526020016000820160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600182015481526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152505090506000600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206040518060800160405290816000820160009054906101000a900460ff161515151581526020016000820160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600182015481526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152505090508160000151158061165f57508060000151155b15611696576040517fda7557bc00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8673ffffffffffffffffffffffffffffffffffffffff16826020015173ffffffffffffffffffffffffffffffffffffffff1614158061170557508673ffffffffffffffffffffffffffffffffffffffff16816020015173ffffffffffffffffffffffffffffffffffffffff1614155b1561173c576040517f3d87e06500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b806040015182604001511461177d576040517f3d87e06500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600080820160006101000a81549060ff02191690556000820160016101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560018201600090556002820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555050600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600080820160006101000a81549060ff02191690556000820160016101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560018201600090556002820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555050600560008154809291906118e890615302565b91905055506005549450600060076000878152602001908152602001600020905085816000018190555060405180604001604052808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815250816001019060026119919291906142c7565b5082604001518160030181905550600283604001516119b09190614e54565b816004018190555086816006018190555060018160070160006101000a81548160ff021916908360038111156119e9576119e8614d8e565b5b0217905550878160070160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600860008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020869080600181540180825580915050600190039060005260206000200160009091909190915055600860008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208690806001815401808255809150506001900390600052602060002001600090919091909150558373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16877fb156957ab2fd6a73b7a1d2aeeafbdde846453def049cab6fd3388bad2084e9d88b85600301548c604051611b639392919061534a565b60405180910390a45050505050949350505050565b6000611b82614344565b600080600080600080600760008a815260200190815260200160002090506000816000015403611bde576040517fb19089b800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b806000015481600101826003015483600401548460070160009054906101000a900460ff166003811115611c1557611c14614d8e565b5b8560070160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16866006015485600280602002604051908101604052809291908260028015611cad576020028201915b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311611c63575b50505050509550975097509750975097509750975050919395979092949650565b611cd6613a3f565b611cdf82613b25565b611ce98282613c1f565b5050565b6000611cf7613d3e565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b905090565b6000611d2a613dc5565b905060008160000160089054906101000a900460ff1615905060008260000160009054906101000a900467ffffffffffffffff1690506000808267ffffffffffffffff16148015611d785750825b9050600060018367ffffffffffffffff16148015611dad575060003073ffffffffffffffffffffffffffffffffffffffff163b145b905081158015611dbb575080155b15611df2576040517ff92ee8a900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60018560000160006101000a81548167ffffffffffffffff021916908367ffffffffffffffff1602179055508315611e425760018560000160086101000a81548160ff0219169083151502179055505b600073ffffffffffffffffffffffffffffffffffffffff168a73ffffffffffffffffffffffffffffffffffffffff1603611eb1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ea8906153cd565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff1603611f20576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611f1790615439565b60405180910390fd5b60328660ff161115611f5e576040517f7064607800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008803611f98576040517f9de3d44100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b868810611fd1576040517fc9b4d6ba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b896000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555088600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550876002819055508660038190555085600460006101000a81548160ff021916908360ff160217905550600060058190555061208b613dd9565b83156120e75760008560000160086101000a81548160ff0219169083151502179055507fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d260016040516120de91906154b2565b60405180910390a15b50505050505050505050565b60066020528060005260406000206000915090508060000160009054906101000a900460ff16908060000160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905084565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630bd756bd6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156121db573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906121ff9190614cda565b73ffffffffffffffffffffffffffffffffffffffff16637582b19e336040518263ffffffff1660e01b81526004016122379190614d07565b60006040518083038186803b15801561224f57600080fd5b505afa158015612263573d6000803e3d6000fd5b50505050600081036122a1576040517f9de3d44100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60035481106122dc576040517fc9b4d6ba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8060028190555050565b600047905090565b6060600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002080548060200260200160405190810160405280929190818152602001828054801561237957602002820191906000526020600020905b815481526020019060010190808311612365575b50505050509050919050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630bd756bd6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156123f0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906124149190614cda565b73ffffffffffffffffffffffffffffffffffffffff16637582b19e336040518263ffffffff1660e01b815260040161244c9190614d07565b60006040518083038186803b15801561246457600080fd5b505afa158015612478573d6000803e3d6000fd5b5050505060025481116124b7576040517fc9b4d6ba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8060038190555050565b6040518060400160405280600581526020017f352e302e3000000000000000000000000000000000000000000000000000000081525081565b6000600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206040518060800160405290816000820160009054906101000a900460ff161515151581526020016000820160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600182015481526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152505090508060000151612654576040517fda7557bc00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600080820160006101000a81549060ff02191690556000820160016101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560018201600090556002820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555050600073ffffffffffffffffffffffffffffffffffffffff16816020015173ffffffffffffffffffffffffffffffffffffffff160361276a5761276581604001513373ffffffffffffffffffffffffffffffffffffffff166138f690919063ffffffff16565b61279e565b61279d338260400151836020015173ffffffffffffffffffffffffffffffffffffffff166139c09092919063ffffffff16565b5b806020015173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fa0de69b73768a9da12f77507bbaf81059bab2088faed72c4d60808ea9dd89f7f8360400151604051612803919061462f565b60405180910390a350565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630bd756bd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015612879573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061289d9190614cda565b73ffffffffffffffffffffffffffffffffffffffff1663f6e31f8f336040518263ffffffff1660e01b81526004016128d59190614d07565b60006040518083038186803b1580156128ed57600080fd5b505afa158015612901573d6000803e3d6000fd5b5050505060008111612948576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161293f90615519565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614612a745760008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636940b5f06040518163ffffffff1660e01b8152600401602060405180830381865afa1580156129e7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612a0b91906151fd565b73ffffffffffffffffffffffffffffffffffffffff1663554b9a0f836040518263ffffffff1660e01b8152600401612a439190614d07565b60006040518083038186803b158015612a5b57600080fd5b505afa158015612a6f573d6000803e3d6000fd5b505050505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603612b7e57804711612ae1576040517f786e0a9900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b612b7960008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166361d027b36040518163ffffffff1660e01b8152600401602060405180830381865afa158015612b4f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612b73919061554e565b826138f6565b612cf0565b6000829050818173ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401612bbd9190614d07565b602060405180830381865afa158015612bda573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612bfe9190615590565b11612c35576040517f786e0a9900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b612cee60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166361d027b36040518163ffffffff1660e01b8152600401602060405180830381865afa158015612ca3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612cc7919061554e565b838373ffffffffffffffffffffffffffffffffffffffff166139c09092919063ffffffff16565b505b5050565b60035481565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614612d81576040517f6bbaa1c100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60006007600083815260200190815260200160002090506000816000015403612dd6576040517fb19089b800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60016003811115612dea57612de9614d8e565b5b8160070160009054906101000a900460ff166003811115612e0e57612e0d614d8e565b5b14612e45576040517fd781e59600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60038160070160006101000a81548160ff02191690836003811115612e6d57612e6c614d8e565b5b0217905550600073ffffffffffffffffffffffffffffffffffffffff168160070160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1603612f9957612f2f816003015482600101600060028110612ee957612ee8614ef6565b5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166138f690919063ffffffff16565b612f94816003015482600101600160028110612f4e57612f4d614ef6565b5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166138f690919063ffffffff16565b6130b0565b61302481600101600060028110612fb357612fb2614ef6565b5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1682600301548360070160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166139c09092919063ffffffff16565b6130af8160010160016002811061303e5761303d614ef6565b5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1682600301548360070160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166139c09092919063ffffffff16565b5b817f700135b4fe8746e2d2c85a9baa43c62887740aebfeb3a439f71a083fe5d5675960405160405180910390a25050565b600460009054906101000a900460ff1681565b60025481565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c6b052666040518163ffffffff1660e01b8152600401602060405180830381865afa158015613168573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061318c919061503c565b73ffffffffffffffffffffffffffffffffffffffff16634d7f334e306040518263ffffffff1660e01b81526004016131c49190614d07565b602060405180830381865afa1580156131e1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906132059190615095565b613244576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161323b90615134565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663abd13afe6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156132af573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906132d39190615192565b73ffffffffffffffffffffffffffffffffffffffff16637d6a5f7b6040518163ffffffff1660e01b815260040160006040518083038186803b15801561331857600080fd5b505afa15801561332c573d6000803e3d6000fd5b5050505060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636940b5f06040518163ffffffff1660e01b8152600401602060405180830381865afa15801561339b573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906133bf91906151fd565b73ffffffffffffffffffffffffffffffffffffffff1663554b9a0f856040518263ffffffff1660e01b81526004016133f79190614d07565b60006040518083038186803b15801561340f57600080fd5b505afa158015613423573d6000803e3d6000fd5b50505050600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900460ff16156134ae576040517f4b1a898d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16036135385734905060008414806134f457503484145b613533576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161352a9061562f565b60405180910390fd5b6135ac565b6000341461357b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401613572906156c1565b60405180910390fd5b8390506135ab3330838873ffffffffffffffffffffffffffffffffffffffff16613de3909392919063ffffffff16565b5b6002548110806135bd575060035481115b156135f4576040517f9de3d44100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60405180608001604052806001151581526020018673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020018473ffffffffffffffffffffffffffffffffffffffff16815250600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506040820151816001015560608201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550905050600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161461386e5760008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663cdc423446040518163ffffffff1660e01b8152600401602060405180830381865afa1580156137dd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906138019190614f9a565b73ffffffffffffffffffffffffffffffffffffffff16637543e3f033856040518363ffffffff1660e01b815260040161383b9291906156e1565b600060405180830381600087803b15801561385557600080fd5b505af1158015613869573d6000803e3d6000fd5b505050505b8273ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fe6df0f6032fe7232a3d31921a186e8d77d3a86f750dd0e11c0510154813bddec846040516138e2919061462f565b60405180910390a460019150509392505050565b8047101561393d5747816040517fcf47918100000000000000000000000000000000000000000000000000000000815260040161393492919061570a565b60405180910390fd5b6000808373ffffffffffffffffffffffffffffffffffffffff168360405161396490615764565b60006040518083038185875af1925050503d80600081146139a1576040519150601f19603f3d011682016040523d82523d6000602084013e6139a6565b606091505b5091509150816139ba576139b981613e65565b5b50505050565b613a3a838473ffffffffffffffffffffffffffffffffffffffff1663a9059cbb85856040516024016139f3929190615779565b604051602081830303815290604052915060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050613ea9565b505050565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff161480613aec57507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16613ad3613f4b565b73ffffffffffffffffffffffffffffffffffffffff1614155b15613b23576040517fe07c8dba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630bd756bd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015613b90573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613bb49190614cda565b73ffffffffffffffffffffffffffffffffffffffff16637582b19e336040518263ffffffff1660e01b8152600401613bec9190614d07565b60006040518083038186803b158015613c0457600080fd5b505afa158015613c18573d6000803e3d6000fd5b5050505050565b8173ffffffffffffffffffffffffffffffffffffffff166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015613c8757506040513d601f19601f82011682018060405250810190613c8491906157b7565b60015b613cc857816040517f4c9c8ce3000000000000000000000000000000000000000000000000000000008152600401613cbf9190614d07565b60405180910390fd5b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b8114613d2f57806040517faa1d49a4000000000000000000000000000000000000000000000000000000008152600401613d26919061495c565b60405180910390fd5b613d398383613fa2565b505050565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff1614613dc3576040517fe07c8dba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b600080613dd0614015565b90508091505090565b613de1614040565b565b613e5f848573ffffffffffffffffffffffffffffffffffffffff166323b872dd868686604051602401613e18939291906157e4565b604051602081830303815290604052915060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050613ea9565b50505050565b600081511115613e7757805160208201fd5b6040517fd6bda27500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600080602060008451602086016000885af180613ecc576040513d6000823e3d81fd5b3d925060005191505060008214613ee7576001811415613f03565b60008473ffffffffffffffffffffffffffffffffffffffff163b145b15613f4557836040517f5274afe7000000000000000000000000000000000000000000000000000000008152600401613f3c9190614d07565b60405180910390fd5b50505050565b6000613f797f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b614080565b60000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b613fab8261408a565b8173ffffffffffffffffffffffffffffffffffffffff167fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b60405160405180910390a2600081511115614008576140028282614157565b50614011565b6140106141db565b5b5050565b60007ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a0060001b905090565b614048614218565b61407e576040517fd7e6bcf800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b6000819050919050565b60008173ffffffffffffffffffffffffffffffffffffffff163b036140e657806040517f4c9c8ce30000000000000000000000000000000000000000000000000000000081526004016140dd9190614d07565b60405180910390fd5b806141137f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b614080565b60000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60606000808473ffffffffffffffffffffffffffffffffffffffff16846040516141819190615857565b600060405180830381855af49150503d80600081146141bc576040519150601f19603f3d011682016040523d82523d6000602084013e6141c1565b606091505b50915091506141d1858383614238565b9250505092915050565b6000341115614216576040517fb398979f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b6000614222613dc5565b60000160089054906101000a900460ff16905090565b60608261424d5761424882613e65565b6142bf565b60008251148015614275575060008473ffffffffffffffffffffffffffffffffffffffff163b145b156142b757836040517f9996b3150000000000000000000000000000000000000000000000000000000081526004016142ae9190614d07565b60405180910390fd5b8190506142c0565b5b9392505050565b8260028101928215614333579160200282015b828111156143325782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550916020019190600101906142da565b5b5090506143409190614366565b5090565b6040518060400160405280600290602082028036833780820191505090505090565b5b8082111561437f576000816000905550600101614367565b5090565b6000604051905090565b600080fd5b600080fd5b600060ff82169050919050565b6143ad81614397565b81146143b857600080fd5b50565b6000813590506143ca816143a4565b92915050565b6000602082840312156143e6576143e561438d565b5b60006143f4848285016143bb565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000614428826143fd565b9050919050565b6144388161441d565b811461444357600080fd5b50565b6000813590506144558161442f565b92915050565b6000602082840312156144715761447061438d565b5b600061447f84828501614446565b91505092915050565b6000819050919050565b61449b81614488565b81146144a657600080fd5b50565b6000813590506144b881614492565b92915050565b6000806000606084860312156144d7576144d661438d565b5b60006144e5868287016144a9565b93505060206144f6868287016144a9565b9250506040614507868287016144a9565b9150509250925092565b600080fd5b600080fd5b600080fd5b60008083601f84011261453657614535614511565b5b8235905067ffffffffffffffff81111561455357614552614516565b5b60208301915083602082028301111561456f5761456e61451b565b5b9250929050565b6000819050919050565b61458981614576565b811461459457600080fd5b50565b6000813590506145a681614580565b92915050565b600080600080606085870312156145c6576145c561438d565b5b600085013567ffffffffffffffff8111156145e4576145e3614392565b5b6145f087828801614520565b9450945050602061460387828801614446565b925050604061461487828801614597565b91505092959194509250565b61462981614488565b82525050565b60006020820190506146446000830184614620565b92915050565b6000602082840312156146605761465f61438d565b5b600061466e848285016144a9565b91505092915050565b600060029050919050565b600081905092915050565b6000819050919050565b6146a08161441d565b82525050565b60006146b28383614697565b60208301905092915050565b6000602082019050919050565b6146d481614677565b6146de8184614682565b92506146e98261468d565b8060005b8381101561471a57815161470187826146a6565b965061470c836146be565b9250506001810190506146ed565b505050505050565b61472b81614397565b82525050565b61473a8161441d565b82525050565b61474981614576565b82525050565b600061010082019050614765600083018a614620565b61477260208301896146cb565b61477f6060830188614620565b61478c6080830187614620565b61479960a0830186614722565b6147a660c0830185614731565b6147b360e0830184614740565b98975050505050505050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61480d826147c4565b810181811067ffffffffffffffff8211171561482c5761482b6147d5565b5b80604052505050565b600061483f614383565b905061484b8282614804565b919050565b600067ffffffffffffffff82111561486b5761486a6147d5565b5b614874826147c4565b9050602081019050919050565b82818337600083830152505050565b60006148a361489e84614850565b614835565b9050828152602081018484840111156148bf576148be6147bf565b5b6148ca848285614881565b509392505050565b600082601f8301126148e7576148e6614511565b5b81356148f7848260208601614890565b91505092915050565b600080604083850312156149175761491661438d565b5b600061492585828601614446565b925050602083013567ffffffffffffffff81111561494657614945614392565b5b614952858286016148d2565b9150509250929050565b60006020820190506149716000830184614740565b92915050565b600080600080600060a086880312156149935761499261438d565b5b60006149a188828901614446565b95505060206149b288828901614446565b94505060406149c3888289016144a9565b93505060606149d4888289016144a9565b92505060806149e5888289016143bb565b9150509295509295909350565b60008115159050919050565b614a07816149f2565b82525050565b6000608082019050614a2260008301876149fe565b614a2f6020830186614731565b614a3c6040830185614620565b614a496060830184614731565b95945050505050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b614a8781614488565b82525050565b6000614a998383614a7e565b60208301905092915050565b6000602082019050919050565b6000614abd82614a52565b614ac78185614a5d565b9350614ad283614a6e565b8060005b83811015614b03578151614aea8882614a8d565b9750614af583614aa5565b925050600181019050614ad6565b5085935050505092915050565b60006020820190508181036000830152614b2a8184614ab2565b905092915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015614b6c578082015181840152602081019050614b51565b60008484015250505050565b6000614b8382614b32565b614b8d8185614b3d565b9350614b9d818560208601614b4e565b614ba6816147c4565b840191505092915050565b60006020820190508181036000830152614bcb8184614b78565b905092915050565b60008060408385031215614bea57614be961438d565b5b6000614bf885828601614446565b9250506020614c09858286016144a9565b9150509250929050565b6000602082019050614c286000830184614722565b92915050565b600080600060608486031215614c4757614c4661438d565b5b6000614c5586828701614446565b9350506020614c66868287016144a9565b9250506040614c7786828701614446565b9150509250925092565b6000602082019050614c9660008301846149fe565b92915050565b6000614ca78261441d565b9050919050565b614cb781614c9c565b8114614cc257600080fd5b50565b600081519050614cd481614cae565b92915050565b600060208284031215614cf057614cef61438d565b5b6000614cfe84828501614cc5565b91505092915050565b6000602082019050614d1c6000830184614731565b92915050565b7f4e6577206261636b656e642077616c6c6574206973207a65726f210000000000600082015250565b6000614d58601b83614b3d565b9150614d6382614d22565b602082019050919050565b60006020820190508181036000830152614d8781614d4b565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000614df782614488565b9150614e0283614488565b9250828201905080821115614e1a57614e19614dbd565b5b92915050565b6000614e2b82614488565b9150614e3683614488565b9250828203905081811115614e4e57614e4d614dbd565b5b92915050565b6000614e5f82614488565b9150614e6a83614488565b9250828202614e7881614488565b91508282048414831517614e8f57614e8e614dbd565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000614ed082614488565b9150614edb83614488565b925082614eeb57614eea614e96565b5b828204905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6000606082019050614f3a6000830186614620565b614f476020830185614620565b614f546040830184614620565b949350505050565b6000614f678261441d565b9050919050565b614f7781614f5c565b8114614f8257600080fd5b50565b600081519050614f9481614f6e565b92915050565b600060208284031215614fb057614faf61438d565b5b6000614fbe84828501614f85565b91505092915050565b6000606082019050614fdc6000830186614731565b614fe96020830185614620565b614ff66040830184614731565b949350505050565b60006150098261441d565b9050919050565b61501981614ffe565b811461502457600080fd5b50565b60008151905061503681615010565b92915050565b6000602082840312156150525761505161438d565b5b600061506084828501615027565b91505092915050565b615072816149f2565b811461507d57600080fd5b50565b60008151905061508f81615069565b92915050565b6000602082840312156150ab576150aa61438d565b5b60006150b984828501615080565b91505092915050565b7f47616d6520646f65736e277420657869737420696e2047616d654d616e61676560008201527f7200000000000000000000000000000000000000000000000000000000000000602082015250565b600061511e602183614b3d565b9150615129826150c2565b604082019050919050565b6000602082019050818103600083015261514d81615111565b9050919050565b600061515f8261441d565b9050919050565b61516f81615154565b811461517a57600080fd5b50565b60008151905061518c81615166565b92915050565b6000602082840312156151a8576151a761438d565b5b60006151b68482850161517d565b91505092915050565b60006151ca8261441d565b9050919050565b6151da816151bf565b81146151e557600080fd5b50565b6000815190506151f7816151d1565b92915050565b6000602082840312156152135761521261438d565b5b6000615221848285016151e8565b91505092915050565b7f706c6179657273206d7573742062652032000000000000000000000000000000600082015250565b6000615260601183614b3d565b915061526b8261522a565b602082019050919050565b6000602082019050818103600083015261528f81615253565b9050919050565b7f73616d6520706c61796572000000000000000000000000000000000000000000600082015250565b60006152cc600b83614b3d565b91506152d782615296565b602082019050919050565b600060208201905081810360008301526152fb816152bf565b9050919050565b600061530d82614488565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361533f5761533e614dbd565b5b600182019050919050565b600060608201905061535f6000830186614731565b61536c6020830185614620565b6153796040830184614740565b949350505050565b7f5f61646472657373426f6f6b206973207a65726f210000000000000000000000600082015250565b60006153b7601583614b3d565b91506153c282615381565b602082019050919050565b600060208201905081810360008301526153e6816153aa565b9050919050565b7f5f6261636b656e6457616c6c6574206973207a65726f21000000000000000000600082015250565b6000615423601783614b3d565b915061542e826153ed565b602082019050919050565b6000602082019050818103600083015261545281615416565b9050919050565b6000819050919050565b600067ffffffffffffffff82169050919050565b6000819050919050565b600061549c61549761549284615459565b615477565b615463565b9050919050565b6154ac81615481565b82525050565b60006020820190506154c760008301846154a3565b92915050565b7f5f616d6f756e74206973207a65726f2100000000000000000000000000000000600082015250565b6000615503601083614b3d565b915061550e826154cd565b602082019050919050565b60006020820190508181036000830152615532816154f6565b9050919050565b6000815190506155488161442f565b92915050565b6000602082840312156155645761556361438d565b5b600061557284828501615539565b91505092915050565b60008151905061558a81614492565b92915050565b6000602082840312156155a6576155a561438d565b5b60006155b48482850161557b565b91505092915050565b7f42657420616d6f756e74206d757374206d61746368206d73672e76616c75652060008201527f666f72206e617469766520746f6b656e00000000000000000000000000000000602082015250565b6000615619603083614b3d565b9150615624826155bd565b604082019050919050565b600060208201905081810360008301526156488161560c565b9050919050565b7f43616e6e6f742073656e6420455448207768656e2062657474696e672077697460008201527f6820746f6b656e73000000000000000000000000000000000000000000000000602082015250565b60006156ab602883614b3d565b91506156b68261564f565b604082019050919050565b600060208201905081810360008301526156da8161569e565b9050919050565b60006040820190506156f66000830185614731565b6157036020830184614731565b9392505050565b600060408201905061571f6000830185614620565b61572c6020830184614620565b9392505050565b600081905092915050565b50565b600061574e600083615733565b91506157598261573e565b600082019050919050565b600061576f82615741565b9150819050919050565b600060408201905061578e6000830185614731565b61579b6020830184614620565b9392505050565b6000815190506157b181614580565b92915050565b6000602082840312156157cd576157cc61438d565b5b60006157db848285016157a2565b91505092915050565b60006060820190506157f96000830186614731565b6158066020830185614731565b6158136040830184614620565b949350505050565b600081519050919050565b60006158318261581b565b61583b8185615733565b935061584b818560208601614b4e565b80840191505092915050565b60006158638284615826565b91508190509291505056fea26469706673582212204a4a86a825deb9981c0595503a3682ebaed388dd1e94b9648d39f7e343a33f5764736f6c634300081c0033",
    deployedBytecode:
      "0x60806040526004361061012e5760003560e01c80636f9fb98a116100ab578063bc9685cf1161006f578063bc9685cf146103d8578063cab11d5d14610401578063d02c8cdf1461042c578063d667dcd714610455578063fa968eea14610480578063fa9ffc32146104ab5761012f565b80636f9fb98a146103055780637c4b35cf146103305780637cfbc7a51461036d578063ad3cb1cc14610396578063b88302bb146103c15761012f565b80634f1ef286116100f25780634f1ef2861461022c57806352d1902d146102485780635b1987cd146102735780635eebea201461029c5780636c188593146102dc5761012f565b80630c559757146101315780630edfe7ec1461015a5780630fbf1ed5146101835780632b8d57d7146101ac5780634b561a16146101e95761012f565b5b005b34801561013d57600080fd5b50610158600480360381019061015391906143d0565b6104db565b005b34801561016657600080fd5b50610181600480360381019061017c919061445b565b61062e565b005b34801561018f57600080fd5b506101aa60048036038101906101a591906144be565b6107d8565b005b3480156101b857600080fd5b506101d360048036038101906101ce91906145ac565b610eaf565b6040516101e0919061462f565b60405180910390f35b3480156101f557600080fd5b50610210600480360381019061020b919061464a565b611b78565b604051610223979695949392919061474f565b60405180910390f35b61024660048036038101906102419190614900565b611cce565b005b34801561025457600080fd5b5061025d611ced565b60405161026a919061495c565b60405180910390f35b34801561027f57600080fd5b5061029a60048036038101906102959190614977565b611d20565b005b3480156102a857600080fd5b506102c360048036038101906102be919061445b565b6120f3565b6040516102d39493929190614a0d565b60405180910390f35b3480156102e857600080fd5b5061030360048036038101906102fe919061464a565b612170565b005b34801561031157600080fd5b5061031a6122e6565b604051610327919061462f565b60405180910390f35b34801561033c57600080fd5b506103576004803603810190610352919061445b565b6122ee565b6040516103649190614b10565b60405180910390f35b34801561037957600080fd5b50610394600480360381019061038f919061464a565b612385565b005b3480156103a257600080fd5b506103ab6124c1565b6040516103b89190614bb1565b60405180910390f35b3480156103cd57600080fd5b506103d66124fa565b005b3480156103e457600080fd5b506103ff60048036038101906103fa9190614bd3565b61280e565b005b34801561040d57600080fd5b50610416612cf4565b604051610423919061462f565b60405180910390f35b34801561043857600080fd5b50610453600480360381019061044e919061464a565b612cfa565b005b34801561046157600080fd5b5061046a6130e1565b6040516104779190614c13565b60405180910390f35b34801561048c57600080fd5b506104956130f4565b6040516104a2919061462f565b60405180910390f35b6104c560048036038101906104c09190614c2e565b6130fa565b6040516104d29190614c81565b60405180910390f35b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630bd756bd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610546573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061056a9190614cda565b73ffffffffffffffffffffffffffffffffffffffff16637582b19e336040518263ffffffff1660e01b81526004016105a29190614d07565b60006040518083038186803b1580156105ba57600080fd5b505afa1580156105ce573d6000803e3d6000fd5b5050505060328160ff161115610610576040517f7064607800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b80600460006101000a81548160ff021916908360ff16021790555050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630bd756bd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610699573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106bd9190614cda565b73ffffffffffffffffffffffffffffffffffffffff16637582b19e336040518263ffffffff1660e01b81526004016106f59190614d07565b60006040518083038186803b15801561070d57600080fd5b505afa158015610721573d6000803e3d6000fd5b50505050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610794576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161078b90614d6e565b60405180910390fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461085f576040517f6bbaa1c100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600060076000858152602001908152602001600020905060008160000154036108b4576040517fb19089b800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600160038111156108c8576108c7614d8e565b5b8160070160009054906101000a900460ff1660038111156108ec576108eb614d8e565b5b14610923576040517fd781e59600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600082846109319190614dec565b90508160040154811115610971576040517f663493a000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008183600401546109839190614e20565b905060006064600460009054906101000a900460ff1660ff1685600401546109ab9190614e54565b6109b59190614ec5565b9050808211156109f1576040517fc4cb9eb900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60028460070160006101000a81548160ff02191690836003811115610a1957610a18614d8e565b5b0217905550600084600101600060028110610a3757610a36614ef6565b5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600085600101600160028110610a7457610a73614ef6565b5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168660070160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1603610b5b576000881115610b2357610b22888373ffffffffffffffffffffffffffffffffffffffff166138f690919063ffffffff16565b5b6000871115610b5657610b55878273ffffffffffffffffffffffffffffffffffffffff166138f690919063ffffffff16565b5b610bf0565b60008660070160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690506000891115610bb957610bb8838a8373ffffffffffffffffffffffffffffffffffffffff166139c09092919063ffffffff16565b5b6000881115610bee57610bed82898373ffffffffffffffffffffffffffffffffffffffff166139c09092919063ffffffff16565b5b505b8073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff168a7fa2fbaf655fd4712ec7380f71664f0d2fa13dfad5225259bbee82b4d54b4579358b8b89604051610c5293929190614f25565b60405180910390a460008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663cdc423446040518163ffffffff1660e01b8152600401602060405180830381865afa158015610cc5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ce99190614f9a565b73ffffffffffffffffffffffffffffffffffffffff1663e91a196b8388600301548960070160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518463ffffffff1660e01b8152600401610d4d93929190614fc7565b600060405180830381600087803b158015610d6757600080fd5b505af1158015610d7b573d6000803e3d6000fd5b5050505060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663cdc423446040518163ffffffff1660e01b8152600401602060405180830381865afa158015610dea573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e0e9190614f9a565b73ffffffffffffffffffffffffffffffffffffffff1663e91a196b8288600301548960070160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518463ffffffff1660e01b8152600401610e7293929190614fc7565b600060405180830381600087803b158015610e8c57600080fd5b505af1158015610ea0573d6000803e3d6000fd5b50505050505050505050505050565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610f38576040517f6bbaa1c100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c6b052666040518163ffffffff1660e01b8152600401602060405180830381865afa158015610fa3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fc7919061503c565b73ffffffffffffffffffffffffffffffffffffffff16634d7f334e306040518263ffffffff1660e01b8152600401610fff9190614d07565b602060405180830381865afa15801561101c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110409190615095565b61107f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161107690615134565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663abd13afe6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156110ea573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061110e9190615192565b73ffffffffffffffffffffffffffffffffffffffff16637d6a5f7b6040518163ffffffff1660e01b815260040160006040518083038186803b15801561115357600080fd5b505afa158015611167573d6000803e3d6000fd5b5050505060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636940b5f06040518163ffffffff1660e01b8152600401602060405180830381865afa1580156111d6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111fa91906151fd565b73ffffffffffffffffffffffffffffffffffffffff1663554b9a0f846040518263ffffffff1660e01b81526004016112329190614d07565b60006040518083038186803b15801561124a57600080fd5b505afa15801561125e573d6000803e3d6000fd5b50505050600285859050146112a8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161129f90615276565b60405180910390fd5b6000858560008181106112be576112bd614ef6565b5b90506020020160208101906112d3919061445b565b90506000868660018181106112eb576112ea614ef6565b5b9050602002016020810190611300919061445b565b9050600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614806113695750600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16145b156113a0576040517fd92e233d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361140e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611405906152e2565b60405180910390fd5b6000600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206040518060800160405290816000820160009054906101000a900460ff161515151581526020016000820160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600182015481526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152505090506000600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206040518060800160405290816000820160009054906101000a900460ff161515151581526020016000820160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600182015481526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152505090508160000151158061165f57508060000151155b15611696576040517fda7557bc00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8673ffffffffffffffffffffffffffffffffffffffff16826020015173ffffffffffffffffffffffffffffffffffffffff1614158061170557508673ffffffffffffffffffffffffffffffffffffffff16816020015173ffffffffffffffffffffffffffffffffffffffff1614155b1561173c576040517f3d87e06500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b806040015182604001511461177d576040517f3d87e06500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600080820160006101000a81549060ff02191690556000820160016101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560018201600090556002820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555050600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600080820160006101000a81549060ff02191690556000820160016101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560018201600090556002820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555050600560008154809291906118e890615302565b91905055506005549450600060076000878152602001908152602001600020905085816000018190555060405180604001604052808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815250816001019060026119919291906142c7565b5082604001518160030181905550600283604001516119b09190614e54565b816004018190555086816006018190555060018160070160006101000a81548160ff021916908360038111156119e9576119e8614d8e565b5b0217905550878160070160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600860008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020869080600181540180825580915050600190039060005260206000200160009091909190915055600860008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208690806001815401808255809150506001900390600052602060002001600090919091909150558373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16877fb156957ab2fd6a73b7a1d2aeeafbdde846453def049cab6fd3388bad2084e9d88b85600301548c604051611b639392919061534a565b60405180910390a45050505050949350505050565b6000611b82614344565b600080600080600080600760008a815260200190815260200160002090506000816000015403611bde576040517fb19089b800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b806000015481600101826003015483600401548460070160009054906101000a900460ff166003811115611c1557611c14614d8e565b5b8560070160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16866006015485600280602002604051908101604052809291908260028015611cad576020028201915b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311611c63575b50505050509550975097509750975097509750975050919395979092949650565b611cd6613a3f565b611cdf82613b25565b611ce98282613c1f565b5050565b6000611cf7613d3e565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b905090565b6000611d2a613dc5565b905060008160000160089054906101000a900460ff1615905060008260000160009054906101000a900467ffffffffffffffff1690506000808267ffffffffffffffff16148015611d785750825b9050600060018367ffffffffffffffff16148015611dad575060003073ffffffffffffffffffffffffffffffffffffffff163b145b905081158015611dbb575080155b15611df2576040517ff92ee8a900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60018560000160006101000a81548167ffffffffffffffff021916908367ffffffffffffffff1602179055508315611e425760018560000160086101000a81548160ff0219169083151502179055505b600073ffffffffffffffffffffffffffffffffffffffff168a73ffffffffffffffffffffffffffffffffffffffff1603611eb1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ea8906153cd565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff1603611f20576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611f1790615439565b60405180910390fd5b60328660ff161115611f5e576040517f7064607800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008803611f98576040517f9de3d44100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b868810611fd1576040517fc9b4d6ba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b896000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555088600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550876002819055508660038190555085600460006101000a81548160ff021916908360ff160217905550600060058190555061208b613dd9565b83156120e75760008560000160086101000a81548160ff0219169083151502179055507fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d260016040516120de91906154b2565b60405180910390a15b50505050505050505050565b60066020528060005260406000206000915090508060000160009054906101000a900460ff16908060000160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905084565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630bd756bd6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156121db573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906121ff9190614cda565b73ffffffffffffffffffffffffffffffffffffffff16637582b19e336040518263ffffffff1660e01b81526004016122379190614d07565b60006040518083038186803b15801561224f57600080fd5b505afa158015612263573d6000803e3d6000fd5b50505050600081036122a1576040517f9de3d44100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60035481106122dc576040517fc9b4d6ba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8060028190555050565b600047905090565b6060600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002080548060200260200160405190810160405280929190818152602001828054801561237957602002820191906000526020600020905b815481526020019060010190808311612365575b50505050509050919050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630bd756bd6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156123f0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906124149190614cda565b73ffffffffffffffffffffffffffffffffffffffff16637582b19e336040518263ffffffff1660e01b815260040161244c9190614d07565b60006040518083038186803b15801561246457600080fd5b505afa158015612478573d6000803e3d6000fd5b5050505060025481116124b7576040517fc9b4d6ba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8060038190555050565b6040518060400160405280600581526020017f352e302e3000000000000000000000000000000000000000000000000000000081525081565b6000600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206040518060800160405290816000820160009054906101000a900460ff161515151581526020016000820160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600182015481526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152505090508060000151612654576040517fda7557bc00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600080820160006101000a81549060ff02191690556000820160016101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560018201600090556002820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555050600073ffffffffffffffffffffffffffffffffffffffff16816020015173ffffffffffffffffffffffffffffffffffffffff160361276a5761276581604001513373ffffffffffffffffffffffffffffffffffffffff166138f690919063ffffffff16565b61279e565b61279d338260400151836020015173ffffffffffffffffffffffffffffffffffffffff166139c09092919063ffffffff16565b5b806020015173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fa0de69b73768a9da12f77507bbaf81059bab2088faed72c4d60808ea9dd89f7f8360400151604051612803919061462f565b60405180910390a350565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630bd756bd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015612879573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061289d9190614cda565b73ffffffffffffffffffffffffffffffffffffffff1663f6e31f8f336040518263ffffffff1660e01b81526004016128d59190614d07565b60006040518083038186803b1580156128ed57600080fd5b505afa158015612901573d6000803e3d6000fd5b5050505060008111612948576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161293f90615519565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614612a745760008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636940b5f06040518163ffffffff1660e01b8152600401602060405180830381865afa1580156129e7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612a0b91906151fd565b73ffffffffffffffffffffffffffffffffffffffff1663554b9a0f836040518263ffffffff1660e01b8152600401612a439190614d07565b60006040518083038186803b158015612a5b57600080fd5b505afa158015612a6f573d6000803e3d6000fd5b505050505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603612b7e57804711612ae1576040517f786e0a9900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b612b7960008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166361d027b36040518163ffffffff1660e01b8152600401602060405180830381865afa158015612b4f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612b73919061554e565b826138f6565b612cf0565b6000829050818173ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401612bbd9190614d07565b602060405180830381865afa158015612bda573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612bfe9190615590565b11612c35576040517f786e0a9900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b612cee60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166361d027b36040518163ffffffff1660e01b8152600401602060405180830381865afa158015612ca3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612cc7919061554e565b838373ffffffffffffffffffffffffffffffffffffffff166139c09092919063ffffffff16565b505b5050565b60035481565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614612d81576040517f6bbaa1c100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60006007600083815260200190815260200160002090506000816000015403612dd6576040517fb19089b800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60016003811115612dea57612de9614d8e565b5b8160070160009054906101000a900460ff166003811115612e0e57612e0d614d8e565b5b14612e45576040517fd781e59600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60038160070160006101000a81548160ff02191690836003811115612e6d57612e6c614d8e565b5b0217905550600073ffffffffffffffffffffffffffffffffffffffff168160070160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1603612f9957612f2f816003015482600101600060028110612ee957612ee8614ef6565b5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166138f690919063ffffffff16565b612f94816003015482600101600160028110612f4e57612f4d614ef6565b5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166138f690919063ffffffff16565b6130b0565b61302481600101600060028110612fb357612fb2614ef6565b5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1682600301548360070160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166139c09092919063ffffffff16565b6130af8160010160016002811061303e5761303d614ef6565b5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1682600301548360070160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166139c09092919063ffffffff16565b5b817f700135b4fe8746e2d2c85a9baa43c62887740aebfeb3a439f71a083fe5d5675960405160405180910390a25050565b600460009054906101000a900460ff1681565b60025481565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c6b052666040518163ffffffff1660e01b8152600401602060405180830381865afa158015613168573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061318c919061503c565b73ffffffffffffffffffffffffffffffffffffffff16634d7f334e306040518263ffffffff1660e01b81526004016131c49190614d07565b602060405180830381865afa1580156131e1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906132059190615095565b613244576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161323b90615134565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663abd13afe6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156132af573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906132d39190615192565b73ffffffffffffffffffffffffffffffffffffffff16637d6a5f7b6040518163ffffffff1660e01b815260040160006040518083038186803b15801561331857600080fd5b505afa15801561332c573d6000803e3d6000fd5b5050505060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636940b5f06040518163ffffffff1660e01b8152600401602060405180830381865afa15801561339b573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906133bf91906151fd565b73ffffffffffffffffffffffffffffffffffffffff1663554b9a0f856040518263ffffffff1660e01b81526004016133f79190614d07565b60006040518083038186803b15801561340f57600080fd5b505afa158015613423573d6000803e3d6000fd5b50505050600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900460ff16156134ae576040517f4b1a898d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16036135385734905060008414806134f457503484145b613533576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161352a9061562f565b60405180910390fd5b6135ac565b6000341461357b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401613572906156c1565b60405180910390fd5b8390506135ab3330838873ffffffffffffffffffffffffffffffffffffffff16613de3909392919063ffffffff16565b5b6002548110806135bd575060035481115b156135f4576040517f9de3d44100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60405180608001604052806001151581526020018673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020018473ffffffffffffffffffffffffffffffffffffffff16815250600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506040820151816001015560608201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550905050600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161461386e5760008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663cdc423446040518163ffffffff1660e01b8152600401602060405180830381865afa1580156137dd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906138019190614f9a565b73ffffffffffffffffffffffffffffffffffffffff16637543e3f033856040518363ffffffff1660e01b815260040161383b9291906156e1565b600060405180830381600087803b15801561385557600080fd5b505af1158015613869573d6000803e3d6000fd5b505050505b8273ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fe6df0f6032fe7232a3d31921a186e8d77d3a86f750dd0e11c0510154813bddec846040516138e2919061462f565b60405180910390a460019150509392505050565b8047101561393d5747816040517fcf47918100000000000000000000000000000000000000000000000000000000815260040161393492919061570a565b60405180910390fd5b6000808373ffffffffffffffffffffffffffffffffffffffff168360405161396490615764565b60006040518083038185875af1925050503d80600081146139a1576040519150601f19603f3d011682016040523d82523d6000602084013e6139a6565b606091505b5091509150816139ba576139b981613e65565b5b50505050565b613a3a838473ffffffffffffffffffffffffffffffffffffffff1663a9059cbb85856040516024016139f3929190615779565b604051602081830303815290604052915060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050613ea9565b505050565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff161480613aec57507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16613ad3613f4b565b73ffffffffffffffffffffffffffffffffffffffff1614155b15613b23576040517fe07c8dba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630bd756bd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015613b90573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613bb49190614cda565b73ffffffffffffffffffffffffffffffffffffffff16637582b19e336040518263ffffffff1660e01b8152600401613bec9190614d07565b60006040518083038186803b158015613c0457600080fd5b505afa158015613c18573d6000803e3d6000fd5b5050505050565b8173ffffffffffffffffffffffffffffffffffffffff166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015613c8757506040513d601f19601f82011682018060405250810190613c8491906157b7565b60015b613cc857816040517f4c9c8ce3000000000000000000000000000000000000000000000000000000008152600401613cbf9190614d07565b60405180910390fd5b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b8114613d2f57806040517faa1d49a4000000000000000000000000000000000000000000000000000000008152600401613d26919061495c565b60405180910390fd5b613d398383613fa2565b505050565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff1614613dc3576040517fe07c8dba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b600080613dd0614015565b90508091505090565b613de1614040565b565b613e5f848573ffffffffffffffffffffffffffffffffffffffff166323b872dd868686604051602401613e18939291906157e4565b604051602081830303815290604052915060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050613ea9565b50505050565b600081511115613e7757805160208201fd5b6040517fd6bda27500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600080602060008451602086016000885af180613ecc576040513d6000823e3d81fd5b3d925060005191505060008214613ee7576001811415613f03565b60008473ffffffffffffffffffffffffffffffffffffffff163b145b15613f4557836040517f5274afe7000000000000000000000000000000000000000000000000000000008152600401613f3c9190614d07565b60405180910390fd5b50505050565b6000613f797f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b614080565b60000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b613fab8261408a565b8173ffffffffffffffffffffffffffffffffffffffff167fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b60405160405180910390a2600081511115614008576140028282614157565b50614011565b6140106141db565b5b5050565b60007ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a0060001b905090565b614048614218565b61407e576040517fd7e6bcf800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b6000819050919050565b60008173ffffffffffffffffffffffffffffffffffffffff163b036140e657806040517f4c9c8ce30000000000000000000000000000000000000000000000000000000081526004016140dd9190614d07565b60405180910390fd5b806141137f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b614080565b60000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60606000808473ffffffffffffffffffffffffffffffffffffffff16846040516141819190615857565b600060405180830381855af49150503d80600081146141bc576040519150601f19603f3d011682016040523d82523d6000602084013e6141c1565b606091505b50915091506141d1858383614238565b9250505092915050565b6000341115614216576040517fb398979f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b6000614222613dc5565b60000160089054906101000a900460ff16905090565b60608261424d5761424882613e65565b6142bf565b60008251148015614275575060008473ffffffffffffffffffffffffffffffffffffffff163b145b156142b757836040517f9996b3150000000000000000000000000000000000000000000000000000000081526004016142ae9190614d07565b60405180910390fd5b8190506142c0565b5b9392505050565b8260028101928215614333579160200282015b828111156143325782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550916020019190600101906142da565b5b5090506143409190614366565b5090565b6040518060400160405280600290602082028036833780820191505090505090565b5b8082111561437f576000816000905550600101614367565b5090565b6000604051905090565b600080fd5b600080fd5b600060ff82169050919050565b6143ad81614397565b81146143b857600080fd5b50565b6000813590506143ca816143a4565b92915050565b6000602082840312156143e6576143e561438d565b5b60006143f4848285016143bb565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000614428826143fd565b9050919050565b6144388161441d565b811461444357600080fd5b50565b6000813590506144558161442f565b92915050565b6000602082840312156144715761447061438d565b5b600061447f84828501614446565b91505092915050565b6000819050919050565b61449b81614488565b81146144a657600080fd5b50565b6000813590506144b881614492565b92915050565b6000806000606084860312156144d7576144d661438d565b5b60006144e5868287016144a9565b93505060206144f6868287016144a9565b9250506040614507868287016144a9565b9150509250925092565b600080fd5b600080fd5b600080fd5b60008083601f84011261453657614535614511565b5b8235905067ffffffffffffffff81111561455357614552614516565b5b60208301915083602082028301111561456f5761456e61451b565b5b9250929050565b6000819050919050565b61458981614576565b811461459457600080fd5b50565b6000813590506145a681614580565b92915050565b600080600080606085870312156145c6576145c561438d565b5b600085013567ffffffffffffffff8111156145e4576145e3614392565b5b6145f087828801614520565b9450945050602061460387828801614446565b925050604061461487828801614597565b91505092959194509250565b61462981614488565b82525050565b60006020820190506146446000830184614620565b92915050565b6000602082840312156146605761465f61438d565b5b600061466e848285016144a9565b91505092915050565b600060029050919050565b600081905092915050565b6000819050919050565b6146a08161441d565b82525050565b60006146b28383614697565b60208301905092915050565b6000602082019050919050565b6146d481614677565b6146de8184614682565b92506146e98261468d565b8060005b8381101561471a57815161470187826146a6565b965061470c836146be565b9250506001810190506146ed565b505050505050565b61472b81614397565b82525050565b61473a8161441d565b82525050565b61474981614576565b82525050565b600061010082019050614765600083018a614620565b61477260208301896146cb565b61477f6060830188614620565b61478c6080830187614620565b61479960a0830186614722565b6147a660c0830185614731565b6147b360e0830184614740565b98975050505050505050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61480d826147c4565b810181811067ffffffffffffffff8211171561482c5761482b6147d5565b5b80604052505050565b600061483f614383565b905061484b8282614804565b919050565b600067ffffffffffffffff82111561486b5761486a6147d5565b5b614874826147c4565b9050602081019050919050565b82818337600083830152505050565b60006148a361489e84614850565b614835565b9050828152602081018484840111156148bf576148be6147bf565b5b6148ca848285614881565b509392505050565b600082601f8301126148e7576148e6614511565b5b81356148f7848260208601614890565b91505092915050565b600080604083850312156149175761491661438d565b5b600061492585828601614446565b925050602083013567ffffffffffffffff81111561494657614945614392565b5b614952858286016148d2565b9150509250929050565b60006020820190506149716000830184614740565b92915050565b600080600080600060a086880312156149935761499261438d565b5b60006149a188828901614446565b95505060206149b288828901614446565b94505060406149c3888289016144a9565b93505060606149d4888289016144a9565b92505060806149e5888289016143bb565b9150509295509295909350565b60008115159050919050565b614a07816149f2565b82525050565b6000608082019050614a2260008301876149fe565b614a2f6020830186614731565b614a3c6040830185614620565b614a496060830184614731565b95945050505050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b614a8781614488565b82525050565b6000614a998383614a7e565b60208301905092915050565b6000602082019050919050565b6000614abd82614a52565b614ac78185614a5d565b9350614ad283614a6e565b8060005b83811015614b03578151614aea8882614a8d565b9750614af583614aa5565b925050600181019050614ad6565b5085935050505092915050565b60006020820190508181036000830152614b2a8184614ab2565b905092915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015614b6c578082015181840152602081019050614b51565b60008484015250505050565b6000614b8382614b32565b614b8d8185614b3d565b9350614b9d818560208601614b4e565b614ba6816147c4565b840191505092915050565b60006020820190508181036000830152614bcb8184614b78565b905092915050565b60008060408385031215614bea57614be961438d565b5b6000614bf885828601614446565b9250506020614c09858286016144a9565b9150509250929050565b6000602082019050614c286000830184614722565b92915050565b600080600060608486031215614c4757614c4661438d565b5b6000614c5586828701614446565b9350506020614c66868287016144a9565b9250506040614c7786828701614446565b9150509250925092565b6000602082019050614c9660008301846149fe565b92915050565b6000614ca78261441d565b9050919050565b614cb781614c9c565b8114614cc257600080fd5b50565b600081519050614cd481614cae565b92915050565b600060208284031215614cf057614cef61438d565b5b6000614cfe84828501614cc5565b91505092915050565b6000602082019050614d1c6000830184614731565b92915050565b7f4e6577206261636b656e642077616c6c6574206973207a65726f210000000000600082015250565b6000614d58601b83614b3d565b9150614d6382614d22565b602082019050919050565b60006020820190508181036000830152614d8781614d4b565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000614df782614488565b9150614e0283614488565b9250828201905080821115614e1a57614e19614dbd565b5b92915050565b6000614e2b82614488565b9150614e3683614488565b9250828203905081811115614e4e57614e4d614dbd565b5b92915050565b6000614e5f82614488565b9150614e6a83614488565b9250828202614e7881614488565b91508282048414831517614e8f57614e8e614dbd565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000614ed082614488565b9150614edb83614488565b925082614eeb57614eea614e96565b5b828204905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6000606082019050614f3a6000830186614620565b614f476020830185614620565b614f546040830184614620565b949350505050565b6000614f678261441d565b9050919050565b614f7781614f5c565b8114614f8257600080fd5b50565b600081519050614f9481614f6e565b92915050565b600060208284031215614fb057614faf61438d565b5b6000614fbe84828501614f85565b91505092915050565b6000606082019050614fdc6000830186614731565b614fe96020830185614620565b614ff66040830184614731565b949350505050565b60006150098261441d565b9050919050565b61501981614ffe565b811461502457600080fd5b50565b60008151905061503681615010565b92915050565b6000602082840312156150525761505161438d565b5b600061506084828501615027565b91505092915050565b615072816149f2565b811461507d57600080fd5b50565b60008151905061508f81615069565b92915050565b6000602082840312156150ab576150aa61438d565b5b60006150b984828501615080565b91505092915050565b7f47616d6520646f65736e277420657869737420696e2047616d654d616e61676560008201527f7200000000000000000000000000000000000000000000000000000000000000602082015250565b600061511e602183614b3d565b9150615129826150c2565b604082019050919050565b6000602082019050818103600083015261514d81615111565b9050919050565b600061515f8261441d565b9050919050565b61516f81615154565b811461517a57600080fd5b50565b60008151905061518c81615166565b92915050565b6000602082840312156151a8576151a761438d565b5b60006151b68482850161517d565b91505092915050565b60006151ca8261441d565b9050919050565b6151da816151bf565b81146151e557600080fd5b50565b6000815190506151f7816151d1565b92915050565b6000602082840312156152135761521261438d565b5b6000615221848285016151e8565b91505092915050565b7f706c6179657273206d7573742062652032000000000000000000000000000000600082015250565b6000615260601183614b3d565b915061526b8261522a565b602082019050919050565b6000602082019050818103600083015261528f81615253565b9050919050565b7f73616d6520706c61796572000000000000000000000000000000000000000000600082015250565b60006152cc600b83614b3d565b91506152d782615296565b602082019050919050565b600060208201905081810360008301526152fb816152bf565b9050919050565b600061530d82614488565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361533f5761533e614dbd565b5b600182019050919050565b600060608201905061535f6000830186614731565b61536c6020830185614620565b6153796040830184614740565b949350505050565b7f5f61646472657373426f6f6b206973207a65726f210000000000000000000000600082015250565b60006153b7601583614b3d565b91506153c282615381565b602082019050919050565b600060208201905081810360008301526153e6816153aa565b9050919050565b7f5f6261636b656e6457616c6c6574206973207a65726f21000000000000000000600082015250565b6000615423601783614b3d565b915061542e826153ed565b602082019050919050565b6000602082019050818103600083015261545281615416565b9050919050565b6000819050919050565b600067ffffffffffffffff82169050919050565b6000819050919050565b600061549c61549761549284615459565b615477565b615463565b9050919050565b6154ac81615481565b82525050565b60006020820190506154c760008301846154a3565b92915050565b7f5f616d6f756e74206973207a65726f2100000000000000000000000000000000600082015250565b6000615503601083614b3d565b915061550e826154cd565b602082019050919050565b60006020820190508181036000830152615532816154f6565b9050919050565b6000815190506155488161442f565b92915050565b6000602082840312156155645761556361438d565b5b600061557284828501615539565b91505092915050565b60008151905061558a81614492565b92915050565b6000602082840312156155a6576155a561438d565b5b60006155b48482850161557b565b91505092915050565b7f42657420616d6f756e74206d757374206d61746368206d73672e76616c75652060008201527f666f72206e617469766520746f6b656e00000000000000000000000000000000602082015250565b6000615619603083614b3d565b9150615624826155bd565b604082019050919050565b600060208201905081810360008301526156488161560c565b9050919050565b7f43616e6e6f742073656e6420455448207768656e2062657474696e672077697460008201527f6820746f6b656e73000000000000000000000000000000000000000000000000602082015250565b60006156ab602883614b3d565b91506156b68261564f565b604082019050919050565b600060208201905081810360008301526156da8161569e565b9050919050565b60006040820190506156f66000830185614731565b6157036020830184614731565b9392505050565b600060408201905061571f6000830185614620565b61572c6020830184614620565b9392505050565b600081905092915050565b50565b600061574e600083615733565b91506157598261573e565b600082019050919050565b600061576f82615741565b9150819050919050565b600060408201905061578e6000830185614731565b61579b6020830184614620565b9392505050565b6000815190506157b181614580565b92915050565b6000602082840312156157cd576157cc61438d565b5b60006157db848285016157a2565b91505092915050565b60006060820190506157f96000830186614731565b6158066020830185614731565b6158136040830184614620565b949350505050565b600081519050919050565b60006158318261581b565b61583b8185615733565b935061584b818560208601614b4e565b80840191505092915050565b60006158638284615826565b91508190509291505056fea26469706673582212204a4a86a825deb9981c0595503a3682ebaed388dd1e94b9648d39f7e343a33f5764736f6c634300081c0033",
    linkReferences: {},
    deployedLinkReferences: {},
  },
];
