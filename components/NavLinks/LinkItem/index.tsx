import Link from "next/link";
import { useRouter } from "next/router";
import globals from '../../../styles/globals.module.scss'

interface Props {
  href: string
  title: string
}

export default function LinkItem({
  href,
  title
}: Props) {
  const url = useRouter().pathname

  return (
    <li>
      <Link href={href}>
        <a className={`${globals.link} ${url.startsWith(`/${href.split('/')[1]}`) ? globals.active : ''}`}>{title}</a>
      </Link>
    </li>
  )
}
