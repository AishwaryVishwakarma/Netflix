export interface PlanData {
  _value: {
    type: string;
    value: number;
  };
  name: string;
  resolution: string;
  features: {
    title: string;
    description: string;
  }[];
}

export const PLANS: PlanData[] = [
  {
    _value: {
      type: 'premium',
      value: 649,
    },
    name: 'Premium',
    resolution: '4K + HDR',
    features: [
      {
        title: 'Monthly Price',
        description: '₹ 649',
      },
      {
        title: 'Resolution',
        description: '4K (Ultra HD) + HDR',
      },
      {
        title: 'Video quality',
        description: 'Best',
      },
      {
        title: 'Supported devices',
        description: 'TV, computer, mobile phone, tablet',
      },
    ],
  },
  {
    _value: {
      type: 'standard',
      value: 499,
    },
    name: 'Standard',
    resolution: '1080p',
    features: [
      {
        title: 'Monthly Price',
        description: '₹ 499',
      },
      {
        title: 'Resolution',
        description: '1080p (Full HD)',
      },
      {
        title: 'Video quality',
        description: 'Better',
      },
      {
        title: 'Supported devices',
        description: 'TV, computer, mobile phone, tablet',
      },
    ],
  },
  {
    _value: {
      type: 'basic',
      value: 199,
    },
    name: 'Basic',
    resolution: '720p',
    features: [
      {
        title: 'Monthly Price',
        description: '₹ 649',
      },
      {
        title: 'Resolution',
        description: '720p (HD)',
      },
      {
        title: 'Video quality',
        description: 'Good',
      },
      {
        title: 'Supported devices',
        description: 'TV, computer, mobile phone, tablet',
      },
    ],
  },
  {
    _value: {
      type: 'mobile',
      value: 149,
    },
    name: 'Mobile',
    resolution: '480p',
    features: [
      {
        title: 'Monthly Price',
        description: '₹ 649',
      },
      {
        title: 'Resolution',
        description: '480p',
      },
      {
        title: 'Video quality',
        description: 'Good',
      },
      {
        title: 'Supported devices',
        description: 'Mobile phone, tablet',
      },
    ],
  },
];
