const Avatar = ({ p, size = 40 }) => {
    return (
        <img src={p.avatar} alt={p.name} width={size} height={size} style={{ width: size, height: size }} className="rounded-full border border-zinc-200 object-cover" />
    )
}

export default Avatar