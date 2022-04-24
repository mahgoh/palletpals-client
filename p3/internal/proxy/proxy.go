package proxy

import (
	"net/http"
	"net/http/httputil"
	"net/url"
)

// NewProxy takes target host and creates a reverse proxy
func NewProxy(targetHost string) (*httputil.ReverseProxy, error) {
	url, err := url.Parse(targetHost)
	if err != nil {
		return nil, err
	}

	proxy := httputil.NewSingleHostReverseProxy(url)

	// modify request
	// originalDirector := proxy.Director
	// proxy.Director = func(req *http.Request) {
	// 		originalDirector(req)
	// 		modifyRequest(req)
	// }

	proxy.ModifyResponse = modifyResponse()
	return proxy, nil
}

func modifyResponse() func(*http.Response) error {
	return func(resp *http.Response) error {
		resp.Header.Set("X-Proxy", "p3")
		return nil
	}
}

// func modifyRequest(req *http.Request) {
// 	if strings.HasPrefix(req.URL.Path, "/api/") {
// 		req.URL.Path = strings.Replace(req.URL.Path, "/api/", "/", 1)
// 	}
// }
