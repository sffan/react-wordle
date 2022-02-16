import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const I18nModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="Language" isOpen={isOpen} handleClose={handleClose}>
    <p className="text-sm text-gray-500 m-10">
      <a className="rounded px-10 py-3 bg-gray-100 my-2 " href="?lang=en">English</a>
    </p>
    <p className="text-sm text-gray-500 m-10">
    <a className="rounded px-10 py-3 bg-gray-100 my-2" href="?lang=es">Español</a>
    </p>
    <p className="text-sm text-gray-500 m-10">
    <a className="rounded px-10 py-3 bg-gray-100 my-2" href="?lang=pt">Português</a>
    </p>
    <p className="text-sm text-gray-500 m-10">
    <a className="rounded px-10 py-3 bg-gray-100 my-2" href="?lang=fr">Fsrançais</a>
    </p>
    <p className="text-sm text-gray-500 m-10">
    <a className="rounded px-10 py-3 bg-gray-100 my-2" href="?lang=de">Deutsch</a>
    </p>
    <p className="text-sm text-gray-500 m-10">
    <a className="rounded px-10 py-3 bg-gray-100 my-2" href="?lang=it">Italiano</a>
    </p>
    </BaseModal>
  )
}
