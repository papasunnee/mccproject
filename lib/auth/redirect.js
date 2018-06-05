import Router from 'next/router'

export default (context, target, asPath) => {
  if (context.res) {
    // server
    // 303: "See other"
    context.res.writeHead(303, { Location: target })
    context.res.end()
  } else {
    // In the browser, we just pretend like this never even happened ;)
    if (asPath)
      Router.replace(target, asPath)
    
     Router.replace(target)
  }
}