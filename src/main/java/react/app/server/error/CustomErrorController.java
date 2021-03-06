package react.app.server.error;

import java.text.MessageFormat;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.google.common.base.Throwables;

import react.app.server.response.Response;

@Controller
class CustomErrorController {
	

	// @RequestMapping("error")
	// public String error(Model model) {
 //        return "error/general";
	// }

	/**
	 * Display an error page, as defined in web.xml <code>custom-error</code> element.
	 */
	@ResponseBody
	@RequestMapping("generalError")	
	public String generalError(HttpServletRequest request, HttpServletResponse response, Model model) {
		// retrieve some useful information from the request
		Integer statusCode = (Integer) request.getAttribute("javax.servlet.error.status_code");
		Throwable throwable = (Throwable) request.getAttribute("javax.servlet.error.exception");
		// String servletName = (String) request.getAttribute("javax.servlet.error.servlet_name");
		String exceptionMessage = getExceptionMessage(throwable, statusCode);
		
		String requestUri = (String) request.getAttribute("javax.servlet.error.request_uri");
		if (requestUri == null) {
			requestUri = "Unknown";
		}
		
		String message = MessageFormat.format("{0} returned for {1} with message {2}", 
			statusCode, requestUri, exceptionMessage
		); 
		
		// model.addAttribute("errorMessage", message);
		// Response res = new Response();
		// res.setTitle("Error");
		// res.setMessage(message);
		// res.setSuccess(false);
  //       return res;

//		model.addAttribute("errorMessage", message);
        return message;
	}

	private String getExceptionMessage(Throwable throwable, Integer statusCode) {
		if (throwable != null) {
			return Throwables.getRootCause(throwable).getMessage();
		}
		HttpStatus httpStatus = HttpStatus.valueOf(statusCode);
		return httpStatus.getReasonPhrase();
	}
}
