/**
 * Copyright (c) 2026 Velocity BPA
 * 
 * Licensed under the Business Source License 1.1 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     https://github.com/VelocityBPA/n8n-nodes-autonolasolas/blob/main/LICENSE
 * 
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
  NodeApiError,
} from 'n8n-workflow';

export class AutonolasOlas implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Autonolas/Olas',
    name: 'autonolasolas',
    icon: 'file:autonolasolas.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with the Autonolas/Olas API',
    defaults: {
      name: 'Autonolas/Olas',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'autonolasolasApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'AgentService',
            value: 'agentService',
          },
          {
            name: 'MechTool',
            value: 'mechTool',
          },
          {
            name: 'StakingPool',
            value: 'stakingPool',
          },
          {
            name: 'MultiChainOperation',
            value: 'multiChainOperation',
          },
          {
            name: 'Governance',
            value: 'governance',
          }
        ],
        default: 'agentService',
      },
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['agentService'] } },
  options: [
    { name: 'Get All', value: 'getAll', description: 'List all agent services', action: 'Get all agent services' },
    { name: 'Get', value: 'get', description: 'Get specific agent service details', action: 'Get agent service' },
    { name: 'Create', value: 'create', description: 'Deploy new agent service', action: 'Create agent service' },
    { name: 'Update', value: 'update', description: 'Update agent service configuration', action: 'Update agent service' },
    { name: 'Delete', value: 'delete', description: 'Remove agent service', action: 'Delete agent service' },
    { name: 'Start', value: 'start', description: 'Start agent service', action: 'Start agent service' },
    { name: 'Stop', value: 'stop', description: 'Stop agent service', action: 'Stop agent service' },
  ],
  default: 'getAll',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['mechTool'] } },
  options: [
    { name: 'Get All', value: 'getAll', description: 'List available Mech tools', action: 'Get all Mech tools' },
    { name: 'Get', value: 'get', description: 'Get Mech tool details', action: 'Get a Mech tool' },
    { name: 'Create', value: 'create', description: 'Create new Mech tool', action: 'Create a Mech tool' },
    { name: 'Update', value: 'update', description: 'Update Mech tool', action: 'Update a Mech tool' },
    { name: 'Delete', value: 'delete', description: 'Remove Mech tool', action: 'Delete a Mech tool' },
    { name: 'Execute', value: 'execute', description: 'Execute Mech tool', action: 'Execute a Mech tool' },
  ],
  default: 'getAll',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['stakingPool'] } },
  options: [
    { name: 'Get All', value: 'getAll', description: 'List all staking pools', action: 'Get all staking pools' },
    { name: 'Get', value: 'get', description: 'Get staking pool details by ID', action: 'Get a staking pool' },
    { name: 'Create', value: 'create', description: 'Create a new staking pool', action: 'Create a staking pool' },
    { name: 'Update', value: 'update', description: 'Update staking pool parameters', action: 'Update a staking pool' },
    { name: 'Delete', value: 'delete', description: 'Remove a staking pool', action: 'Delete a staking pool' },
    { name: 'Stake', value: 'stake', description: 'Stake tokens in a pool', action: 'Stake tokens' },
    { name: 'Unstake', value: 'unstake', description: 'Unstake tokens from a pool', action: 'Unstake tokens' },
  ],
  default: 'getAll',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['multiChainOperation'],
		},
	},
	options: [
		{
			name: 'Get All Chains',
			value: 'getAll',
			description: 'List supported chains and their status',
			action: 'Get all chains',
		},
		{
			name: 'Get Chain Configuration',
			value: 'get',
			description: 'Get chain-specific configuration',
			action: 'Get chain configuration',
		},
		{
			name: 'Bridge Assets',
			value: 'bridge',
			description: 'Bridge assets between chains',
			action: 'Bridge assets',
		},
		{
			name: 'Get Chain Transactions',
			value: 'getTransactions',
			description: 'Get chain transactions',
			action: 'Get chain transactions',
		},
		{
			name: 'Deploy Contract',
			value: 'deploy',
			description: 'Deploy contract to specific chain',
			action: 'Deploy contract',
		},
	],
	default: 'getAll',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: { show: { resource: ['governance'] } },
	options: [
		{ name: 'Get All Proposals', value: 'getAll', description: 'List governance proposals', action: 'Get all governance proposals' },
		{ name: 'Get Proposal', value: 'get', description: 'Get proposal details', action: 'Get a governance proposal' },
		{ name: 'Create Proposal', value: 'create', description: 'Create governance proposal', action: 'Create a governance proposal' },
		{ name: 'Update Proposal', value: 'update', description: 'Update proposal (if allowed)', action: 'Update a governance proposal' },
		{ name: 'Vote on Proposal', value: 'vote', description: 'Vote on proposal', action: 'Vote on a governance proposal' },
		{ name: 'Execute Proposal', value: 'execute', description: 'Execute passed proposal', action: 'Execute a governance proposal' },
	],
	default: 'getAll',
},
{
  displayName: 'Chain ID',
  name: 'chainId',
  type: 'options',
  options: [
    { name: 'Ethereum', value: 1 },
    { name: 'Polygon', value: 137 },
    { name: 'Gnosis Chain', value: 100 },
  ],
  displayOptions: {
    show: {
      resource: ['agentService'],
      operation: ['getAll', 'create'],
    },
  },
  default: 1,
  description: 'The blockchain chain ID to use for the operation',
},
{
  displayName: 'Status',
  name: 'status',
  type: 'options',
  options: [
    { name: 'Active', value: 'active' },
    { name: 'Inactive', value: 'inactive' },
    { name: 'Deploying', value: 'deploying' },
    { name: 'Stopping', value: 'stopping' },
  ],
  displayOptions: {
    show: {
      resource: ['agentService'],
      operation: ['getAll'],
    },
  },
  default: '',
  description: 'Filter services by status',
  required: false,
},
{
  displayName: 'Owner',
  name: 'owner',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['agentService'],
      operation: ['getAll'],
    },
  },
  default: '',
  description: 'Filter services by owner address',
  required: false,
},
{
  displayName: 'Service ID',
  name: 'serviceId',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['agentService'],
      operation: ['get', 'update', 'delete', 'start', 'stop'],
    },
  },
  default: '',
  description: 'The ID of the agent service',
  required: true,
},
{
  displayName: 'Include Metadata',
  name: 'includeMetadata',
  type: 'boolean',
  displayOptions: {
    show: {
      resource: ['agentService'],
      operation: ['get'],
    },
  },
  default: false,
  description: 'Whether to include additional metadata in the response',
  required: false,
},
{
  displayName: 'Name',
  name: 'name',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['agentService'],
      operation: ['create'],
    },
  },
  default: '',
  description: 'The name of the agent service',
  required: true,
},
{
  displayName: 'Description',
  name: 'description',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['agentService'],
      operation: ['create'],
    },
  },
  default: '',
  description: 'Description of the agent service',
  required: false,
},
{
  displayName: 'Config',
  name: 'config',
  type: 'json',
  displayOptions: {
    show: {
      resource: ['agentService'],
      operation: ['create', 'update'],
    },
  },
  default: '{}',
  description: 'Configuration object for the agent service',
  required: true,
},
{
  displayName: 'Metadata',
  name: 'metadata',
  type: 'json',
  displayOptions: {
    show: {
      resource: ['agentService'],
      operation: ['update'],
    },
  },
  default: '{}',
  description: 'Additional metadata for the agent service',
  required: false,
},
{
  displayName: 'Force Stop',
  name: 'forceStop',
  type: 'boolean',
  displayOptions: {
    show: {
      resource: ['agentService'],
      operation: ['delete'],
    },
  },
  default: false,
  description: 'Whether to forcefully stop the service before deletion',
  required: false,
},
{
  displayName: 'Category',
  name: 'category',
  type: 'string',
  displayOptions: { show: { resource: ['mechTool'], operation: ['getAll'] } },
  default: '',
  description: 'Filter tools by category',
},
{
  displayName: 'Chain ID',
  name: 'chainId',
  type: 'options',
  displayOptions: { show: { resource: ['mechTool'], operation: ['getAll', 'execute'] } },
  options: [
    { name: 'Ethereum', value: '1' },
    { name: 'Polygon', value: '137' },
    { name: 'Gnosis', value: '100' },
  ],
  default: '1',
  description: 'Blockchain network chain ID',
},
{
  displayName: 'Verified Only',
  name: 'verifiedOnly',
  type: 'boolean',
  displayOptions: { show: { resource: ['mechTool'], operation: ['getAll'] } },
  default: false,
  description: 'Only return verified tools',
},
{
  displayName: 'Tool ID',
  name: 'toolId',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['mechTool'], operation: ['get', 'update', 'delete', 'execute'] } },
  default: '',
  description: 'The ID of the Mech tool',
},
{
  displayName: 'Include Usage Stats',
  name: 'includeUsageStats',
  type: 'boolean',
  displayOptions: { show: { resource: ['mechTool'], operation: ['get'] } },
  default: false,
  description: 'Include usage statistics in the response',
},
{
  displayName: 'Name',
  name: 'name',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['mechTool'], operation: ['create'] } },
  default: '',
  description: 'Name of the Mech tool',
},
{
  displayName: 'Description',
  name: 'description',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['mechTool'], operation: ['create'] } },
  default: '',
  description: 'Description of the Mech tool',
},
{
  displayName: 'Code',
  name: 'code',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['mechTool'], operation: ['create', 'update'] } },
  default: '',
  description: 'Tool implementation code',
  typeOptions: {
    rows: 10,
  },
},
{
  displayName: 'Metadata',
  name: 'metadata',
  type: 'json',
  displayOptions: { show: { resource: ['mechTool'], operation: ['create', 'update'] } },
  default: '{}',
  description: 'Additional metadata for the tool',
},
{
  displayName: 'Input Data',
  name: 'inputData',
  type: 'json',
  required: true,
  displayOptions: { show: { resource: ['mechTool'], operation: ['execute'] } },
  default: '{}',
  description: 'Input data for tool execution',
},
{
  displayName: 'Chain ID',
  name: 'chainId',
  type: 'options',
  displayOptions: { show: { resource: ['stakingPool'], operation: ['getAll', 'create'] } },
  options: [
    { name: 'Ethereum', value: '1' },
    { name: 'Polygon', value: '137' },
    { name: 'Gnosis', value: '100' },
  ],
  default: '1',
  description: 'The blockchain network to operate on',
},
{
  displayName: 'Status',
  name: 'status',
  type: 'options',
  displayOptions: { show: { resource: ['stakingPool'], operation: ['getAll'] } },
  options: [
    { name: 'Active', value: 'active' },
    { name: 'Inactive', value: 'inactive' },
    { name: 'Paused', value: 'paused' },
  ],
  required: false,
  default: '',
  description: 'Filter pools by status',
},
{
  displayName: 'Minimum APR',
  name: 'minApr',
  type: 'number',
  displayOptions: { show: { resource: ['stakingPool'], operation: ['getAll'] } },
  required: false,
  default: 0,
  description: 'Filter pools with minimum APR percentage',
},
{
  displayName: 'Pool ID',
  name: 'poolId',
  type: 'string',
  displayOptions: { show: { resource: ['stakingPool'], operation: ['get', 'update', 'delete', 'stake', 'unstake'] } },
  required: true,
  default: '',
  description: 'The unique identifier of the staking pool',
},
{
  displayName: 'Include Rewards',
  name: 'includeRewards',
  type: 'boolean',
  displayOptions: { show: { resource: ['stakingPool'], operation: ['get'] } },
  default: false,
  description: 'Include reward details in the response',
},
{
  displayName: 'Pool Name',
  name: 'name',
  type: 'string',
  displayOptions: { show: { resource: ['stakingPool'], operation: ['create'] } },
  required: true,
  default: '',
  description: 'Name of the new staking pool',
},
{
  displayName: 'Pool Configuration',
  name: 'config',
  type: 'json',
  displayOptions: { show: { resource: ['stakingPool'], operation: ['create', 'update'] } },
  required: true,
  default: '{}',
  description: 'Pool configuration parameters as JSON',
},
{
  displayName: 'Initial Stake',
  name: 'initialStake',
  type: 'string',
  displayOptions: { show: { resource: ['stakingPool'], operation: ['create'] } },
  required: true,
  default: '0',
  description: 'Initial stake amount for the pool',
},
{
  displayName: 'Withdraw All',
  name: 'withdrawAll',
  type: 'boolean',
  displayOptions: { show: { resource: ['stakingPool'], operation: ['delete'] } },
  default: false,
  description: 'Withdraw all staked tokens before deletion',
},
{
  displayName: 'Amount',
  name: 'amount',
  type: 'string',
  displayOptions: { show: { resource: ['stakingPool'], operation: ['stake', 'unstake'] } },
  required: true,
  default: '0',
  description: 'Amount of tokens to stake or unstake',
},
{
  displayName: 'Duration',
  name: 'duration',
  type: 'number',
  displayOptions: { show: { resource: ['stakingPool'], operation: ['stake'] } },
  required: false,
  default: 0,
  description: 'Staking duration in days',
},
{
	displayName: 'Active Only',
	name: 'active_only',
	type: 'boolean',
	default: false,
	displayOptions: {
		show: {
			resource: ['multiChainOperation'],
			operation: ['getAll'],
		},
	},
	description: 'Whether to return only active chains',
},
{
	displayName: 'Chain ID',
	name: 'chain_id',
	type: 'string',
	required: true,
	default: '',
	displayOptions: {
		show: {
			resource: ['multiChainOperation'],
			operation: ['get', 'bridge', 'getTransactions', 'deploy'],
		},
	},
	description: 'The chain ID to operate on',
},
{
	displayName: 'Include Metrics',
	name: 'include_metrics',
	type: 'boolean',
	default: false,
	displayOptions: {
		show: {
			resource: ['multiChainOperation'],
			operation: ['get'],
		},
	},
	description: 'Whether to include chain metrics in the response',
},
{
	displayName: 'Target Chain',
	name: 'target_chain',
	type: 'string',
	required: true,
	default: '',
	displayOptions: {
		show: {
			resource: ['multiChainOperation'],
			operation: ['bridge'],
		},
	},
	description: 'The target chain ID for bridging',
},
{
	displayName: 'Amount',
	name: 'amount',
	type: 'string',
	required: true,
	default: '',
	displayOptions: {
		show: {
			resource: ['multiChainOperation'],
			operation: ['bridge'],
		},
	},
	description: 'The amount to bridge',
},
{
	displayName: 'Asset',
	name: 'asset',
	type: 'string',
	required: true,
	default: '',
	displayOptions: {
		show: {
			resource: ['multiChainOperation'],
			operation: ['bridge'],
		},
	},
	description: 'The asset to bridge',
},
{
	displayName: 'Address',
	name: 'address',
	type: 'string',
	default: '',
	displayOptions: {
		show: {
			resource: ['multiChainOperation'],
			operation: ['getTransactions'],
		},
	},
	description: 'The address to filter transactions for',
},
{
	displayName: 'Block Range',
	name: 'block_range',
	type: 'string',
	default: '',
	displayOptions: {
		show: {
			resource: ['multiChainOperation'],
			operation: ['getTransactions'],
		},
	},
	description: 'The block range to search (e.g., "1000-2000")',
},
{
	displayName: 'Contract Data',
	name: 'contract_data',
	type: 'json',
	required: true,
	default: '{}',
	displayOptions: {
		show: {
			resource: ['multiChainOperation'],
			operation: ['deploy'],
		},
	},
	description: 'The contract data to deploy',
},
{
	displayName: 'Gas Limit',
	name: 'gas_limit',
	type: 'number',
	default: 21000,
	displayOptions: {
		show: {
			resource: ['multiChainOperation'],
			operation: ['deploy'],
		},
	},
	description: 'The gas limit for contract deployment',
},
{
	displayName: 'Chain ID',
	name: 'chainId',
	type: 'options',
	required: true,
	displayOptions: { show: { resource: ['governance'] } },
	options: [
		{ name: 'Ethereum', value: '1' },
		{ name: 'Polygon', value: '137' },
		{ name: 'Gnosis', value: '100' },
	],
	default: '1',
	description: 'The blockchain network to interact with',
},
{
	displayName: 'Status',
	name: 'status',
	type: 'options',
	displayOptions: { show: { resource: ['governance'], operation: ['getAll'] } },
	options: [
		{ name: 'All', value: '' },
		{ name: 'Active', value: 'active' },
		{ name: 'Pending', value: 'pending' },
		{ name: 'Executed', value: 'executed' },
		{ name: 'Failed', value: 'failed' },
	],
	default: '',
	description: 'Filter proposals by status',
},
{
	displayName: 'Proposer',
	name: 'proposer',
	type: 'string',
	displayOptions: { show: { resource: ['governance'], operation: ['getAll'] } },
	default: '',
	description: 'Filter proposals by proposer address',
},
{
	displayName: 'Vote Threshold',
	name: 'voteThreshold',
	type: 'number',
	displayOptions: { show: { resource: ['governance'], operation: ['getAll'] } },
	default: 0,
	description: 'Minimum vote threshold to filter proposals',
},
{
	displayName: 'Proposal ID',
	name: 'proposalId',
	type: 'string',
	required: true,
	displayOptions: { show: { resource: ['governance'], operation: ['get', 'update', 'vote', 'execute'] } },
	default: '',
	description: 'ID of the governance proposal',
},
{
	displayName: 'Include Votes',
	name: 'includeVotes',
	type: 'boolean',
	displayOptions: { show: { resource: ['governance'], operation: ['get'] } },
	default: false,
	description: 'Whether to include vote details in the response',
},
{
	displayName: 'Title',
	name: 'title',
	type: 'string',
	required: true,
	displayOptions: { show: { resource: ['governance'], operation: ['create'] } },
	default: '',
	description: 'Title of the governance proposal',
},
{
	displayName: 'Description',
	name: 'description',
	type: 'string',
	required: true,
	displayOptions: { show: { resource: ['governance'], operation: ['create', 'update'] } },
	default: '',
	description: 'Description of the governance proposal',
},
{
	displayName: 'Actions',
	name: 'actions',
	type: 'json',
	required: true,
	displayOptions: { show: { resource: ['governance'], operation: ['create'] } },
	default: '[]',
	description: 'Array of actions to be executed if proposal passes',
},
{
	displayName: 'Execution Delay',
	name: 'executionDelay',
	type: 'number',
	displayOptions: { show: { resource: ['governance'], operation: ['create'] } },
	default: 86400,
	description: 'Delay in seconds before proposal can be executed after passing',
},
{
	displayName: 'Vote Choice',
	name: 'voteChoice',
	type: 'options',
	required: true,
	displayOptions: { show: { resource: ['governance'], operation: ['vote'] } },
	options: [
		{ name: 'For', value: 'for' },
		{ name: 'Against', value: 'against' },
		{ name: 'Abstain', value: 'abstain' },
	],
	default: 'for',
	description: 'Vote choice for the proposal',
},
{
	displayName: 'Voting Power',
	name: 'votingPower',
	type: 'number',
	displayOptions: { show: { resource: ['governance'], operation: ['vote'] } },
	default: 0,
	description: 'Voting power to use (0 for maximum available)',
},
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const resource = this.getNodeParameter('resource', 0) as string;

    switch (resource) {
      case 'agentService':
        return [await executeAgentServiceOperations.call(this, items)];
      case 'mechTool':
        return [await executeMechToolOperations.call(this, items)];
      case 'stakingPool':
        return [await executeStakingPoolOperations.call(this, items)];
      case 'multiChainOperation':
        return [await executeMultiChainOperationOperations.call(this, items)];
      case 'governance':
        return [await executeGovernanceOperations.call(this, items)];
      default:
        throw new NodeOperationError(this.getNode(), `The resource "${resource}" is not supported`);
    }
  }
}

// ============================================================
// Resource Handler Functions
// ============================================================

async function executeAgentServiceOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('autonolasolasApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      switch (operation) {
        case 'getAll': {
          const chainId = this.getNodeParameter('chainId', i) as number;
          const status = this.getNodeParameter('status', i) as string;
          const owner = this.getNodeParameter('owner', i) as string;

          const queryParams = new URLSearchParams();
          queryParams.append('chain_id', chainId.toString());
          if (status) queryParams.append('status', status);
          if (owner) queryParams.append('owner', owner);

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/services?${queryParams.toString()}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'get': {
          const serviceId = this.getNodeParameter('serviceId', i) as string;
          const includeMetadata = this.getNodeParameter('includeMetadata', i) as boolean;

          const queryParams = new URLSearchParams();
          if (includeMetadata) queryParams.append('include_metadata', 'true');

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/services/${serviceId}${queryParams.toString() ? '?' + queryParams.toString() : ''}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'create': {
          const name = this.getNodeParameter('name', i) as string;
          const description = this.getNodeParameter('description', i) as string;
          const config = this.getNodeParameter('config', i) as string;
          const chainId = this.getNodeParameter('chainId', i) as number;

          const body: any = {
            name,
            description,
            config: typeof config === 'string' ? JSON.parse(config) : config,
            chain_id: chainId,
          };

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/services`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body,
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'update': {
          const serviceId = this.getNodeParameter('serviceId', i) as string;
          const config = this.getNodeParameter('config', i) as string;
          const metadata = this.getNodeParameter('metadata', i) as string;

          const body: any = {
            config: typeof config === 'string' ? JSON.parse(config) : config,
            metadata: typeof metadata === 'string' ? JSON.parse(metadata) : metadata,
          };

          const options: any = {
            method: 'PUT',
            url: `${credentials.baseUrl}/services/${serviceId}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body,
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'delete': {
          const serviceId = this.getNodeParameter('serviceId', i) as string;
          const forceStop = this.getNodeParameter('forceStop', i) as boolean;

          const queryParams = new URLSearchParams();
          if (forceStop) queryParams.append('force_stop', 'true');

          const options: any = {
            method: 'DELETE',
            url: `${credentials.baseUrl}/services/${serviceId}${queryParams.toString() ? '?' + queryParams.toString() : ''}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'start': {
          const serviceId = this.getNodeParameter('serviceId', i) as string;

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/services/${serviceId}/start`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'stop': {
          const serviceId = this.getNodeParameter('serviceId', i) as string;

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/services/${serviceId}/stop`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({
        json: result,
        pairedItem: { item: i },
      });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({
          json: { error: error.message },
          pairedItem: { item: i },
        });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executeMechToolOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('autonolasolasApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      switch (operation) {
        case 'getAll': {
          const category = this.getNodeParameter('category', i) as string;
          const chainId = this.getNodeParameter('chainId', i) as string;
          const verifiedOnly = this.getNodeParameter('verifiedOnly', i) as boolean;

          const queryParams = new URLSearchParams();
          if (category) queryParams.append('category', category);
          if (chainId) queryParams.append('chain_id', chainId);
          if (verifiedOnly) queryParams.append('verified_only', verifiedOnly.toString());

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/mech/tools${queryParams.toString() ? '?' + queryParams.toString() : ''}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'get': {
          const toolId = this.getNodeParameter('toolId', i) as string;
          const includeUsageStats = this.getNodeParameter('includeUsageStats', i) as boolean;

          const queryParams = new URLSearchParams();
          if (includeUsageStats) queryParams.append('include_usage_stats', includeUsageStats.toString());

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/mech/tools/${toolId}${queryParams.toString() ? '?' + queryParams.toString() : ''}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'create': {
          const name = this.getNodeParameter('name', i) as string;
          const description = this.getNodeParameter('description', i) as string;
          const code = this.getNodeParameter('code', i) as string;
          const metadata = this.getNodeParameter('metadata', i) as object;

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/mech/tools`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body: {
              name,
              description,
              code,
              metadata,
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'update': {
          const toolId = this.getNodeParameter('toolId', i) as string;
          const code = this.getNodeParameter('code', i) as string;
          const metadata = this.getNodeParameter('metadata', i) as object;

          const options: any = {
            method: 'PUT',
            url: `${credentials.baseUrl}/mech/tools/${toolId}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body: {
              code,
              metadata,
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'delete': {
          const toolId = this.getNodeParameter('toolId', i) as string;

          const options: any = {
            method: 'DELETE',
            url: `${credentials.baseUrl}/mech/tools/${toolId}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'execute': {
          const toolId = this.getNodeParameter('toolId', i) as string;
          const inputData = this.getNodeParameter('inputData', i) as object;
          const chainId = this.getNodeParameter('chainId', i) as string;

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/mech/tools/${toolId}/execute`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body: {
              input_data: inputData,
              chain_id: chainId,
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({
        json: result,
        pairedItem: { item: i },
      });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({
          json: { error: error.message },
          pairedItem: { item: i },
        });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executeStakingPoolOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('autonolasolasApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;
      const baseUrl = credentials.baseUrl || 'https://api.autonolas.network/v1';
      const headers = {
        'Authorization': `Bearer ${credentials.apiKey}`,
        'Content-Type': 'application/json',
      };

      switch (operation) {
        case 'getAll': {
          const chainId = this.getNodeParameter('chainId', i) as string;
          const status = this.getNodeParameter('status', i, '') as string;
          const minApr = this.getNodeParameter('minApr', i, 0) as number;
          
          let url = `${baseUrl}/staking/pools?chain_id=${chainId}`;
          if (status) url += `&status=${status}`;
          if (minApr > 0) url += `&min_apr=${minApr}`;

          const options: any = {
            method: 'GET',
            url,
            headers,
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'get': {
          const poolId = this.getNodeParameter('poolId', i) as string;
          const includeRewards = this.getNodeParameter('includeRewards', i) as boolean;
          
          let url = `${baseUrl}/staking/pools/${poolId}`;
          if (includeRewards) url += '?include_rewards=true';

          const options: any = {
            method: 'GET',
            url,
            headers,
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'create': {
          const name = this.getNodeParameter('name', i) as string;
          const config = this.getNodeParameter('config', i) as string;
          const chainId = this.getNodeParameter('chainId', i) as string;
          const initialStake = this.getNodeParameter('initialStake', i) as string;

          const options: any = {
            method: 'POST',
            url: `${baseUrl}/staking/pools`,
            headers,
            body: {
              name,
              config: typeof config === 'string' ? JSON.parse(config) : config,
              chain_id: chainId,
              initial_stake: initialStake,
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'update': {
          const poolId = this.getNodeParameter('poolId', i) as string;
          const config = this.getNodeParameter('config', i) as string;

          const options: any = {
            method: 'PUT',
            url: `${baseUrl}/staking/pools/${poolId}`,
            headers,
            body: {
              config: typeof config === 'string' ? JSON.parse(config) : config,
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'delete': {
          const poolId = this.getNodeParameter('poolId', i) as string;
          const withdrawAll = this.getNodeParameter('withdrawAll', i) as boolean;

          const options: any = {
            method: 'DELETE',
            url: `${baseUrl}/staking/pools/${poolId}?withdraw_all=${withdrawAll}`,
            headers,
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'stake': {
          const poolId = this.getNodeParameter('poolId', i) as string;
          const amount = this.getNodeParameter('amount', i) as string;
          const duration = this.getNodeParameter('duration', i, 0) as number;

          const body: any = {
            amount,
          };
          if (duration > 0) body.duration = duration;

          const options: any = {
            method: 'POST',
            url: `${baseUrl}/staking/pools/${poolId}/stake`,
            headers,
            body,
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'unstake': {
          const poolId = this.getNodeParameter('poolId', i) as string;
          const amount = this.getNodeParameter('amount', i) as string;

          const options: any = {
            method: 'POST',
            url: `${baseUrl}/staking/pools/${poolId}/unstake`,
            headers,
            body: {
              amount,
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executeMultiChainOperationOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('autonolasolasApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'getAll': {
					const activeOnly = this.getNodeParameter('active_only', i) as boolean;
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/chains`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						qs: activeOnly ? { active_only: true } : {},
						json: true,
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}
				case 'get': {
					const chainId = this.getNodeParameter('chain_id', i) as string;
					const includeMetrics = this.getNodeParameter('include_metrics', i) as boolean;
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/chains/${chainId}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						qs: includeMetrics ? { include_metrics: true } : {},
						json: true,
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}
				case 'bridge': {
					const chainId = this.getNodeParameter('chain_id', i) as string;
					const targetChain = this.getNodeParameter('target_chain', i) as string;
					const amount = this.getNodeParameter('amount', i) as string;
					const asset = this.getNodeParameter('asset', i) as string;
					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/chains/${chainId}/bridge`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body: {
							target_chain: targetChain,
							amount: amount,
							asset: asset,
						},
						json: true,
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}
				case 'getTransactions': {
					const chainId = this.getNodeParameter('chain_id', i) as string;
					const address = this.getNodeParameter('address', i) as string;
					const blockRange = this.getNodeParameter('block_range', i) as string;
					const qs: any = {};
					if (address) qs.address = address;
					if (blockRange) qs.block_range = blockRange;
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/chains/${chainId}/transactions`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						qs: qs,
						json: true,
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}
				case 'deploy': {
					const chainId = this.getNodeParameter('chain_id', i) as string;
					const contractData = this.getNodeParameter('contract_data', i) as any;
					const gasLimit = this.getNodeParameter('gas_limit', i) as number;
					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/chains/${chainId}/deploy`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body: {
							contract_data: contractData,
							gas_limit: gasLimit,
						},
						json: true,
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}
				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});
		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeGovernanceOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('autonolasolasApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;
			const chainId = this.getNodeParameter('chainId', i) as string;

			switch (operation) {
				case 'getAll': {
					const status = this.getNodeParameter('status', i) as string;
					const proposer = this.getNodeParameter('proposer', i) as string;
					const voteThreshold = this.getNodeParameter('voteThreshold', i) as number;

					const queryParams = new URLSearchParams();
					queryParams.append('chain_id', chainId);
					if (status) queryParams.append('status', status);
					if (proposer) queryParams.append('proposer', proposer);
					if (voteThreshold > 0) queryParams.append('vote_threshold', voteThreshold.toString());

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/governance/proposals?${queryParams.toString()}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'get': {
					const proposalId = this.getNodeParameter('proposalId', i) as string;
					const includeVotes = this.getNodeParameter('includeVotes', i) as boolean;

					const queryParams = new URLSearchParams();
					queryParams.append('chain_id', chainId);
					if (includeVotes) queryParams.append('include_votes', 'true');

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/governance/proposals/${proposalId}?${queryParams.toString()}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'create': {
					const title = this.getNodeParameter('title', i) as string;
					const description = this.getNodeParameter('description', i) as string;
					const actions = this.getNodeParameter('actions', i) as string;
					const executionDelay = this.getNodeParameter('executionDelay', i) as number;

					let parsedActions: any;
					try {
						parsedActions = JSON.parse(actions);
					} catch (error: any) {
						throw new NodeOperationError(this.getNode(), `Invalid JSON in actions: ${error.message}`);
					}

					const body = {
						chain_id: chainId,
						title,
						description,
						actions: parsedActions,
						execution_delay: executionDelay,
					};

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/governance/proposals`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'update': {
					const proposalId = this.getNodeParameter('proposalId', i) as string;
					const description = this.getNodeParameter('description', i) as string;

					const body = {
						chain_id: chainId,
						description,
					};

					const options: any = {
						method: 'PUT',
						url: `${credentials.baseUrl}/governance/proposals/${proposalId}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'vote': {
					const proposalId = this.getNodeParameter('proposalId', i) as string;
					const voteChoice = this.getNodeParameter('voteChoice', i) as string;
					const votingPower = this.getNodeParameter('votingPower', i) as number;

					const body = {
						chain_id: chainId,
						vote_choice: voteChoice,
						voting_power: votingPower || undefined,
					};

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/governance/proposals/${proposalId}/vote`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'execute': {
					const proposalId = this.getNodeParameter('proposalId', i) as string;

					const body = {
						chain_id: chainId,
					};

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/governance/proposals/${proposalId}/execute`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});
		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}
