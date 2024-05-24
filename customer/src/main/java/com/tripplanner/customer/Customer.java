package com.tripplanner.customer;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;

import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Builder
@Entity
@AllArgsConstructor
public class Customer {

		@Id
		@SequenceGenerator(name = "customer_id_sequence",
				sequenceName = "customer_id_sequence")
		@GeneratedValue(strategy = GenerationType.SEQUENCE,
				generator = "customer_id_sequence")
		private Integer id;
		private String firstName;
		private String lastName;
		private String email;

		@Override
		public final boolean equals(Object object) {
				if (this == object) return true;
				if (object == null) return false;
				Class<?> oEffectiveClass = object instanceof HibernateProxy ? ((HibernateProxy) object).getHibernateLazyInitializer().getPersistentClass() : object.getClass();
				Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
				if (thisEffectiveClass != oEffectiveClass) return false;
				Customer customer = (Customer) object;
				return getId() != null && Objects.equals(getId(), customer.getId());
		}

		@Override
		public final int hashCode() {
				return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
		}
}
