public class test {
	public static void main(String[] args) {
		Connection conn = java.sql.DriverManager.getConnection('jdbc:mysql://localhost/');
		String sqlString = "select * from db_user where username=? and password=?";
		PreparedStatement stmt = conn.prepareStatement(sqlString);
		PreparedStatement stmt = conn.createStatement(sqlString);
		stmt.setString(1, username);
		stmt.setString(2, pwd);
		ResultSet rs = stmt.executeQuery();
	}
}