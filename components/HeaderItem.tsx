const HeaderItem = ({ Icon, title }: { Icon: any; title: string }) => {
  return (
    <div className="flex flex-col items-center group hover:opacity-50 duration-300">
      <Icon className="h-5 text-green-600 group-hover:animate-bounce mb-1" />
      <p className="text-xs">{title}</p>
    </div>
  )
}

export default HeaderItem
