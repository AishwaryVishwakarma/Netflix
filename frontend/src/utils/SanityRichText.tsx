import React from 'react';

const markType = ['strong'] as const;

interface Props {
  textBlock: Array<{
    _key: string;
    children: {
      marks: typeof markType;
      text: string;
      _key: string;
    }[];
    listItem?: string;
  }>;
  className?: string;
}

// Using this to provide numbering to numbered list items
let listNumbering: number = 1;

const SanityRichText: React.FC<Props> = ({textBlock, className}) => {
  const loopChild = (
    child: Props['textBlock'][0]['children'][0],
    listItem?: string
  ) => {
    const {_key, marks, text} = child ?? {};

    let htmlChildrenText = text;

    if (listItem === 'number') {
      htmlChildrenText = `${listNumbering}. ${text}`;
      listNumbering++;
    }

    const element: Array<React.JSX.Element> =
      marks.length > 0
        ? marks.map((mark) => <strong key={_key}>{htmlChildrenText}</strong>)
        : [<span key={_key}>{htmlChildrenText}</span>];

    return element;
  };

  // This functions create a parent span element
  const loopBlock = (block: Props['textBlock'][0]) => {
    const {_key, children, listItem} = block ?? {};

    if (!listItem) {
      listNumbering = 1;
    }

    return (
      <span key={_key} data-block-type={listItem ?? 'span'}>
        {children.map((child) => {
          return loopChild(child, listItem);
        })}
      </span>
    );
  };

  return (
    <div className={className}>
      {textBlock.map((block) => {
        return loopBlock(block);
      })}
    </div>
  );
};

export default SanityRichText;
