import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import ClearIcon from '@/assets/icons/clear-icon.svg';
import Button from '@/components/Button';
import IconButton from '@/components/Button/IconButton';
import ErrorMessage from '@/components/ErrorMessage';
import { InputField } from '@/components/InputFields';
import { validatePassword } from '@/utils/form';

import TogglePassword from './TogglePassword';
import * as styles from './index.module.scss';

type Props = {
  className?: string;
  // eslint-disable-next-line react/boolean-prop-naming
  autoFocus?: boolean;
  onSubmit: (password: string) => void;
  errorMessage?: string;
  clearErrorMessage?: () => void;
};

type FieldState = {
  newPassword: string;
  confirmPassword: string;
};

const SetPassword = ({
  className,
  autoFocus,
  onSubmit,
  errorMessage,
  clearErrorMessage,
}: Props) => {
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    watch,
    resetField,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FieldState>({
    reValidateMode: 'onBlur',
    defaultValues: { newPassword: '', confirmPassword: '' },
  });

  useEffect(() => {
    if (!isValid) {
      clearErrorMessage?.();
    }
  }, [clearErrorMessage, isValid]);

  const onSubmitHandler = useCallback(
    (event?: React.FormEvent<HTMLFormElement>) => {
      clearErrorMessage?.();

      void handleSubmit((data, event) => {
        onSubmit(data.newPassword);
      })(event);
    },
    [clearErrorMessage, handleSubmit, onSubmit]
  );

  return (
    <form className={classNames(styles.form, className)} onSubmit={onSubmitHandler}>
      <InputField
        className={styles.inputField}
        type={showPassword ? 'text' : 'password'}
        autoComplete="new-password"
        placeholder={t('input.password')}
        autoFocus={autoFocus}
        isDanger={!!errors.newPassword}
        errorMessage={errors.newPassword?.message}
        aria-invalid={!!errors.newPassword}
        {...register('newPassword', {
          required: t('error.password_required'),
          validate: (password) => {
            const errorMessage = validatePassword(password);

            if (errorMessage) {
              return typeof errorMessage === 'string'
                ? t(`error.${errorMessage}`)
                : t(`error.${errorMessage.code}`, errorMessage.data);
            }

            return true;
          },
        })}
        isSuffixFocusVisible={!!watch('newPassword')}
        suffix={
          <IconButton
            onClick={() => {
              resetField('newPassword');
            }}
          >
            <ClearIcon />
          </IconButton>
        }
      />

      <InputField
        className={styles.inputField}
        type={showPassword ? 'text' : 'password'}
        autoComplete="new-password"
        placeholder={t('input.confirm_password')}
        errorMessage={errors.confirmPassword?.message}
        aria-invalid={!!errors.confirmPassword}
        {...register('confirmPassword', {
          validate: (value) => value === watch('newPassword') || t('error.passwords_do_not_match'),
        })}
        isSuffixFocusVisible={!!watch('confirmPassword')}
        suffix={
          <IconButton
            onClick={() => {
              resetField('confirmPassword');
            }}
          >
            <ClearIcon />
          </IconButton>
        }
      />

      {errorMessage && <ErrorMessage className={styles.formErrors}>{errorMessage}</ErrorMessage>}

      <TogglePassword isChecked={showPassword} onChange={setShowPassword} />

      <Button name="submit" title="action.save_password" htmlType="submit" />

      <input hidden type="submit" />
    </form>
  );
};

export default SetPassword;
