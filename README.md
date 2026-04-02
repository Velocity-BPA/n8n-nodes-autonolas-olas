# n8n-nodes-autonolas-olas

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

An n8n community node for integrating with Autonolas/Olas autonomous agent framework. This node provides 5 resources with comprehensive operations for managing agent services, mech tools, staking pools, multi-chain operations, and governance activities within the Olas ecosystem.

![n8n Community Node](https://img.shields.io/badge/n8n-Community%20Node-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Autonomous Agents](https://img.shields.io/badge/Autonomous-Agents-purple)
![Multi-Chain](https://img.shields.io/badge/Multi-Chain-green)
![DeFi](https://img.shields.io/badge/DeFi-Staking-orange)

## Features

- **Agent Service Management** - Deploy, monitor, and control autonomous agent services
- **Mech Tool Integration** - Access and utilize AI-powered mech tools for decision making
- **Staking Pool Operations** - Manage staking rewards and participate in network economics
- **Multi-Chain Support** - Execute operations across multiple blockchain networks
- **Governance Participation** - Vote on proposals and participate in decentralized governance
- **Real-time Monitoring** - Track agent performance and service health metrics
- **Automated Rewards** - Handle staking rewards and service fee distribution
- **Cross-Chain Coordination** - Coordinate agent activities across different chains

## Installation

### Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** → **Community Nodes**
3. Click **Install a community node**
4. Enter `n8n-nodes-autonolas-olas`
5. Click **Install**

### Manual Installation

```bash
cd ~/.n8n
npm install n8n-nodes-autonolas-olas
```

### Development Installation

```bash
git clone https://github.com/Velocity-BPA/n8n-nodes-autonolas-olas.git
cd n8n-nodes-autonolas-olas
npm install
npm run build
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-autonolas-olas
n8n start
```

## Credentials Setup

| Field | Description | Required |
|-------|-------------|----------|
| API Key | Your Autonolas/Olas API key for authentication | Yes |
| Environment | Target environment (mainnet, testnet) | Yes |
| Network | Blockchain network to connect to | Yes |

## Resources & Operations

### 1. Agent Service

| Operation | Description |
|-----------|-------------|
| Create | Deploy a new autonomous agent service |
| Get | Retrieve agent service details and status |
| List | Get all agent services in your account |
| Update | Modify agent service configuration |
| Delete | Terminate and remove an agent service |
| Start | Activate an agent service |
| Stop | Pause an agent service |
| Monitor | Get real-time performance metrics |

### 2. Mech Tool

| Operation | Description |
|-----------|-------------|
| Execute | Run a mech tool with specified parameters |
| Get | Retrieve mech tool details and capabilities |
| List | Get available mech tools |
| Create | Register a new mech tool |
| Update | Modify mech tool configuration |
| Delete | Remove a mech tool |
| Test | Test mech tool functionality |
| Monitor | Track mech tool usage and performance |

### 3. Staking Pool

| Operation | Description |
|-----------|-------------|
| Create | Create a new staking pool |
| Get | Retrieve staking pool information |
| List | Get all available staking pools |
| Stake | Deposit tokens into a staking pool |
| Unstake | Withdraw tokens from a staking pool |
| Claim Rewards | Collect accumulated staking rewards |
| Get Rewards | Check pending rewards balance |
| Update | Modify staking pool parameters |

### 4. Multi Chain Operation

| Operation | Description |
|-----------|-------------|
| Execute | Perform cross-chain operations |
| Get Status | Check multi-chain operation status |
| List | Get all multi-chain operations |
| Create Bridge | Set up cross-chain bridge connection |
| Transfer | Transfer assets between chains |
| Synchronize | Sync state across multiple chains |
| Monitor | Track cross-chain operation progress |
| Validate | Verify cross-chain transaction integrity |

### 5. Governance

| Operation | Description |
|-----------|-------------|
| Create Proposal | Submit a new governance proposal |
| Get Proposal | Retrieve proposal details and status |
| List Proposals | Get all governance proposals |
| Vote | Cast a vote on a proposal |
| Get Votes | Check voting results for a proposal |
| Delegate | Delegate voting power to another address |
| Get Delegation | Check current delegation status |
| Execute | Execute a passed proposal |

## Usage Examples

```javascript
// Deploy a new agent service
{
  "name": "trading-agent",
  "type": "autonomous-trader",
  "config": {
    "strategy": "market-making",
    "assets": ["ETH", "USDC"],
    "risk_level": "moderate"
  },
  "chains": ["ethereum", "polygon"]
}
```

```javascript
// Execute a mech tool for price prediction
{
  "tool_id": "price-predictor-v2",
  "parameters": {
    "asset": "ETH",
    "timeframe": "24h",
    "confidence_level": 0.85
  },
  "callback_url": "https://webhook.site/prediction-results"
}
```

```javascript
// Stake tokens in a pool
{
  "pool_id": "olas-staking-pool-1",
  "amount": "1000",
  "duration": "30d",
  "auto_compound": true
}
```

```javascript
// Vote on a governance proposal
{
  "proposal_id": "prop-2024-001",
  "vote": "yes",
  "voting_power": "5000",
  "reason": "This proposal improves network efficiency"
}
```

## Error Handling

| Error | Description | Solution |
|-------|-------------|----------|
| Invalid API Key | Authentication failed with provided credentials | Verify API key is correct and active |
| Insufficient Balance | Not enough tokens for staking or operations | Check wallet balance and add funds |
| Service Unavailable | Agent service is temporarily down | Retry after a few minutes or check service status |
| Network Error | Blockchain network connection failed | Switch to different RPC endpoint or retry |
| Invalid Parameters | Request parameters are malformed | Validate input data according to API documentation |
| Rate Limited | Too many requests in short timeframe | Implement exponential backoff retry strategy |

## Development

```bash
npm install
npm run build
npm test
npm run lint
npm run dev
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service, or paid automation offering requires a commercial license.

For licensing inquiries: **licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

Contributions are welcome! Please ensure:

1. Code follows existing style conventions
2. All tests pass (`npm test`)
3. Linting passes (`npm run lint`)
4. Documentation is updated for new features
5. Commit messages are descriptive

## Support

- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-autonolas-olas/issues)
- **Autonolas Documentation**: [docs.autonolas.network](https://docs.autonolas.network)
- **Olas Developer Hub**: [dev.olas.network](https://dev.olas.network)