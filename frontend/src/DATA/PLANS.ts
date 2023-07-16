export interface PlanData {
  _value: {
    type: string;
    value: number;
  };
  background: string;
  name: string;
  resolution: string;
  svgFill: string;
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
    background:
      'radial-gradient(140.76% 131.96% at 100% 100%, rgb(229, 9, 20) 0%, rgba(74, 42, 150, 0.5) 73.57%, rgba(74, 42, 150, 0) 100%), rgb(29, 82, 157)',
    name: 'Premium',
    resolution: '4K + HDR',
    svgFill: '#e50914',
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
    background:
      'radial-gradient(140.76% 131.96% at 100% 100%, rgb(176, 56, 220) 0%, rgba(74, 42, 150, 0.5) 73.57%, rgba(74, 42, 150, 0) 100%), rgb(29, 82, 157)',
    name: 'Standard',
    resolution: '1080p',
    svgFill: '#b038dc',
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
    background:
      'radial-gradient(140.76% 131.96% at 100% 100%, rgb(109, 59, 227) 0%, rgba(74, 42, 150, 0.5) 73.57%, rgba(74, 42, 150, 0) 100%), rgb(29, 82, 157)',
    name: 'Basic',
    resolution: '720p',
    svgFill: '#6d3be3',
    features: [
      {
        title: 'Monthly Price',
        description: '₹ 199',
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
    background:
      'radial-gradient(140.76% 131.96% at 100% 100%, rgb(33, 114, 227) 0%, rgba(74, 42, 150, 0.5) 73.57%, rgba(74, 42, 150, 0) 100%), rgb(29, 82, 157)',
    name: 'Mobile',
    resolution: '480p',
    svgFill: '#2172e3',
    features: [
      {
        title: 'Monthly Price',
        description: '₹ 149',
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
