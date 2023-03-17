import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { onKeyDownHandler } from '@/utils/a11y';

import type { MultiCardSelectorOption } from '../types';
import * as styles from './index.module.scss';

type Props = {
  options: MultiCardSelectorOption[];
  value: string[];
  onChange: (value: string[]) => void;
  isNotAllowEmpty?: boolean;
  className?: string;
  optionClassName?: string;
};

const MultiCardSelector = ({
  options,
  value: selectedValues,
  onChange,
  isNotAllowEmpty = false,
  className,
  optionClassName,
}: Props) => {
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });

  const onToggle = (value: string) => {
    if (selectedValues.includes(value) && selectedValues.length === 1 && isNotAllowEmpty) {
      return;
    }

    onChange(
      selectedValues.includes(value)
        ? selectedValues.filter((selected) => selected !== value)
        : [...selectedValues, value]
    );
  };

  return (
    <div className={classNames(styles.selector, className)}>
      {options.map(({ icon, title, value, tag, trailingTag }) => (
        <div
          key={value}
          role="button"
          tabIndex={0}
          className={classNames(
            styles.option,
            selectedValues.includes(value) && styles.selected,
            optionClassName
          )}
          onClick={() => {
            onToggle(value);
          }}
          onKeyDown={onKeyDownHandler(() => {
            onToggle(value);
          })}
        >
          {icon && <span className={styles.icon}>{icon}</span>}
          <div className={styles.content}>
            <div>
              {typeof title === 'string' ? t(title) : title}
              {trailingTag && (
                <span className={classNames(styles.tag, styles.trailingTag)}>{t(trailingTag)}</span>
              )}
            </div>
            {tag && <span className={styles.tag}>{t(tag)}</span>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MultiCardSelector;