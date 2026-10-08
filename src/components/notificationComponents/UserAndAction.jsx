const UserAndAction = ({ p, action }) => {

    // Idris Okafor would like to follow your journeys · 4 mutual
    // Kavi Rao replied to your reply on “A small room, a long winter”.

    return (
        <p className="text-[15px] leading-relaxed">
            <span className="font-medium text-zinc-900">{p.name}</span>{" "}
            <span className="text-zinc-700">{action}</span>
        </p>
    )
}

export default UserAndAction