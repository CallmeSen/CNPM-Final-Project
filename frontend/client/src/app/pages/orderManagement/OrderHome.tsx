"use client";

type OrderHomeProps = {
	orders?: unknown[];
};

const OrderHome = ({ orders = [] }: OrderHomeProps) => {
	return (
		<div style={{ padding: "2rem" }}>
			<h2>Your orders</h2>
			{orders.length === 0 ? (
				<p>You haven&apos;t created any orders yet.</p>
			) : (
				<ul>
					{orders.map((_, index) => (
						<li key={index}>Order #{index + 1}</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default OrderHome;
