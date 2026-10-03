import * as AlertDialog from '@radix-ui/react-alert-dialog';
import styles from './ConfirmDialog.module.scss';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onOpenChange: (open: boolean) => void;
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmText = 'Подтвердить',
  cancelText = 'Отмена',
  onConfirm,
  onOpenChange,
}: ConfirmDialogProps) {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={styles.overlay} />

        <AlertDialog.Content className={styles.content}>
          <AlertDialog.Title className={styles.title}>
            {title}
          </AlertDialog.Title>

          {description && (
            <AlertDialog.Description className={styles.description}>
              {description}
            </AlertDialog.Description>
          )}

          <div className={styles.actions}>
            <AlertDialog.Cancel className={styles.cancelButton}>
              {cancelText}
            </AlertDialog.Cancel>

            <AlertDialog.Action
              className={styles.confirmButton}
              onClick={onConfirm}
            >
              {confirmText}
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}