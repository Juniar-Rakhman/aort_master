package nz.ac.ara.aort.entities.master;


import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

/**
 * Created by a9jr5626 on 8/11/16.
 * @author Sulthonyh
 * @version 1.0
 * @created 12-Aug-2016 4:11:46 PM
 */
@Data
@Entity
@Table(name = "staff")
public class Staff {
	@Id
	@Column(name = "staff_id", columnDefinition = "nvarchar(50)")
	private String id;

	public String getStaffId() {
		return this.getId();	
	}
	
	@Column(name = "department", columnDefinition = "nvarchar(50)")
	private String department;

	@Column(name = "email", columnDefinition = "nvarchar(128)")
	private String email;

	@Column(name = "first_name", columnDefinition = "nvarchar(50)")
	private String firstName;

	@Column(name = "is_employed")
	private short isEmployed;

	@Column(name = "last_name", columnDefinition = "nvarchar(50)")
	private String lastName;

//	@Column(name = "campus_location", columnDefinition = "nvarchar(50)")
	@Transient
	private String location;

	@Column(name = "office_phone", columnDefinition = "nvarchar(30)")
	private String officePhone;

	@Transient
	@JoinTable(name="staff_position",
			joinColumns=@JoinColumn(name="staff_id", referencedColumnName="staff_id"),
			inverseJoinColumns=@JoinColumn(name="position_id", referencedColumnName="position_id"))
	private List<Position> positions;

	@Column(name = "total_fte")
	private BigDecimal totalFte;

	@Column(name = "username", columnDefinition = "nvarchar(15)")
	private String username;

	public Staff(){
	}

	public void finalize() throws Throwable {
	}
}