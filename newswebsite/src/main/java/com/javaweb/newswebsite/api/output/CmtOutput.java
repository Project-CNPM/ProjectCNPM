package com.javaweb.newswebsite.api.output;

import java.util.ArrayList;
import java.util.List;

import com.javaweb.newswebsite.dto.CmtDTO;

public class CmtOutput {
	private int page;
	private int totalPage;
	private List<CmtDTO> listCmt = new ArrayList<>();
	private String sortName;
	private String sortBy;
	private int totalUser;
	private String keyword;
	
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getTotalPage() {
		return totalPage;
	}
	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}
	public List<CmtDTO> getListCmt() {
		return listCmt;
	}
	public void setListCmt(List<CmtDTO> listCmt) {
		this.listCmt = listCmt;
	}
	public String getSortName() {
		return sortName;
	}
	public void setSortName(String sortName) {
		this.sortName = sortName;
	}
	public String getSortBy() {
		return sortBy;
	}
	public void setSortBy(String sortBy) {
		this.sortBy = sortBy;
	}
	public int getTotalUser() {
		return totalUser;
	}
	public void setTotalUser(int totalUser) {
		this.totalUser = totalUser;
	}
	public String getKeyword() {
		return keyword;
	}
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
	
}
