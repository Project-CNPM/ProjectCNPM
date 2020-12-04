package com.javaweb.newswebsite.api;

public class UserAPI {
	@GetMapping(value = "/user/statistics")
	public UserOutPut statistics(@RequestParam("startdate") String startdate,
								 @RequestParam("enddate") String enddate,
								 HttpServletRequest request) throws java.text.ParseException {
		UserOutPut userOut = new UserOutPut();
		SimpleDateFormat fomater = new SimpleDateFormat("yyyy-MM-dd");
		Date sDate = null;
		Date eDate = null;
		
		try {
			sDate = fomater.parse(startdate);
			eDate = fomater.parse(enddate);
		}catch(ParseException e) {
			e.printStackTrace();
		}
		userOut.setListUser(service.findAllByCreatedDateBetween(sDate, eDate));
		userOut.setTotalUser(userOut.getListUser().size());
		return userOut;
	}
}
